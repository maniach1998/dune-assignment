'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

interface PriceChartProps {
	coinId: string;
	name: string;
	symbol: string;
}

interface PriceData {
	time: number;
	priceUsd: string;
	date: string;
}

export default function PriceChart({ coinId, name, symbol }: PriceChartProps) {
	const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Function to fetch price history
		const fetchPriceHistory = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/history/${coinId}`);

				if (!response.ok) {
					throw new Error('Failed to fetch price history');
				}

				const data = await response.json();
				setPriceHistory(data);
			} catch (err) {
				console.error('Error fetching price history:', err);
				setError('Failed to load price history data');
			} finally {
				setIsLoading(false);
			}
		};

		fetchPriceHistory();
	}, [coinId]);

	// Format data for chart
	const chartData = priceHistory.map(({ time, priceUsd, date }) => ({
		time,
		price: parseFloat(priceUsd),
		date,
	}));

	return (
		<Card className='lg:col-span-3'>
			<CardHeader>
				<CardTitle>
					<h3 className='text-xl font-bold'>Price Chart (Last Hour)</h3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading && (
					<div className='flex justify-center items-center h-[300px]'>
						<p className='text-muted-foreground'>Loading price history...</p>
					</div>
				)}

				{error && (
					<div className='flex justify-center items-center h-[300px]'>
						<p className='text-red-500'>{error}</p>
					</div>
				)}

				{!isLoading && !error && priceHistory.length > 0 && (
					<div className='h-[300px] w-full'>
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart
								data={chartData}
								margin={{
									top: 10,
									right: 30,
									left: 0,
									bottom: 0,
								}}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey='date' tick={{ fontSize: 12 }} />
								<YAxis
									domain={['auto', 'auto']}
									tickFormatter={(value) =>
										value.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
											minimumFractionDigits: 0,
											maximumFractionDigits: 2,
										})
									}
								/>
								<Tooltip
									formatter={(value: any) => [
										value.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										}),
										'Price',
									]}
									labelFormatter={(label) => `Time: ${label}`}
								/>
								<Area
									type='monotone'
									dataKey='price'
									stroke='#8884d8'
									fill='#8884d8'
									fillOpacity={0.2}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				)}

				{!isLoading && !error && priceHistory.length === 0 && (
					<div className='flex justify-center items-center h-[300px]'>
						<p className='text-muted-foreground'>No price history data available</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
