import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: coinId } = await params;

	// Calculate time for the last hour
	const end = Date.now();
	const start = end - 60 * 60 * 1000; // 1 hour ago

	try {
		const BASE_URL = 'https://rest.coincap.io/v3';
		const url = `${BASE_URL}/assets/${coinId}/history`;

		const queryParams = new URLSearchParams({
			interval: 'm1', // 1-minute intervals
			start: start.toString(),
			end: end.toString(),
		});

		const res = await fetch(
			`${url}?${queryParams.toString()}&apiKey=${process.env.COINCAP_API_KEY}`,
			{
				next: { revalidate: 60 }, // Cache for 60 seconds
			}
		);

		if (!res.ok) {
			throw new Error(`API returned status ${res.status}`);
		}

		const data = await res.json();

		// Process the data to format dates
		const processedData = data.data.map((item: any) => ({
			...item,
			date: new Date(item.time).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}),
		}));

		return NextResponse.json(processedData);
	} catch (error) {
		console.error(`Error fetching history for ${coinId}:`, error);
		return NextResponse.json({ error: 'Failed to fetch price history data' }, { status: 500 });
	}
}
