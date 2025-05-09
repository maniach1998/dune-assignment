import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: coinId } = await params;

	try {
		const BASE_URL = 'https://rest.coincap.io/v3';
		const url = `${BASE_URL}/assets/${coinId}?apiKey=${process.env.COINCAP_API_KEY}`;

		const res = await fetch(url, {
			next: { revalidate: 30 }, // Cache for 30 seconds
		});

		if (!res.ok) {
			// Handle 404 specifically for invalid coin IDs
			if (res.status === 404) {
				return NextResponse.json(
					{ error: `Cryptocurrency with ID '${coinId}' not found` },
					{ status: 404 }
				);
			}

			// Handle other API errors
			throw new Error(`API returned status ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		// Check if the data has the expected structure
		if (!data.data) {
			throw new Error('Invalid data format received from API');
		}

		return NextResponse.json(data.data);
	} catch (error) {
		console.error(`Error fetching asset ${coinId}:`, error);
		return NextResponse.json({ error: 'Failed to fetch cryptocurrency data' }, { status: 500 });
	}
}
