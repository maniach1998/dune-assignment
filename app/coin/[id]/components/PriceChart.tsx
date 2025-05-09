'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

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

export default function PriceChart({ coinId, name }: PriceChartProps) {
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

	// Calculate min and max price for better chart display
	const prices = chartData.map((item) => item.price);
	const minPrice = Math.min(...(prices.length ? prices : [0]));
	const maxPrice = Math.max(...(prices.length ? prices : [0]));
	const priceBuffer = (maxPrice - minPrice) * 0.1; // 10% buffer for better visualization

	return (
		<Card className='lg:col-span-3 w-full overflow-hidden'>
			<CardHeader className='pb-2'>
				<CardTitle>
					<h3 className='text-xl tracking-tight font-bold'>{name} Price Chart (Last Hour)</h3>
				</CardTitle>
				<p className='text-sm text-muted-foreground'>Historical price data for the last hour</p>
			</CardHeader>
			<CardContent className='p-0 sm:p-6'>
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
					<div className='w-full h-[300px]'>
						<ChartContainer
							className='w-full h-full'
							config={{
								price: {
									label: 'Price',
									theme: {
										light: '#f97316',
										dark: '#f97316',
									},
								},
							}}>
							<AreaChart
								data={chartData}
								margin={{
									top: 5,
									right: 5,
									left: 0,
									bottom: 5,
								}}>
								<defs>
									<linearGradient id='colorPrice' x1='0' y1='0' x2='0' y2='1'>
										<stop offset='5%' stopColor='#f97316' stopOpacity={0.3} />
										<stop offset='95%' stopColor='#f97316' stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey='date'
									tick={{ fontSize: 10 }}
									axisLine={false}
									tickLine={false}
									minTickGap={30}
									height={20}
								/>
								<YAxis
									domain={[Math.max(0, minPrice - priceBuffer), maxPrice + priceBuffer]}
									tickFormatter={(value) =>
										value.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
											minimumFractionDigits: 0,
											maximumFractionDigits: 2,
										})
									}
									axisLine={false}
									tickLine={false}
									width={60}
									fontSize={10}
								/>
								<ChartTooltip
									content={(props) => {
										const { active, payload, label } = props;
										if (active && payload && payload.length) {
											const price = payload[0].value;
											return (
												<div className='bg-background border border-border shadow-md rounded-md p-2 z-50'>
													<p className='font-medium text-xs mb-1'>Time: {label}</p>
													<p className='text-base font-mono'>
														{typeof price === 'number' && (
															<>
																<span className='text-primary'>Price: </span>
																<span>
																	{price.toLocaleString('en-US', {
																		style: 'currency',
																		currency: 'USD',
																	})}
																</span>
															</>
														)}
													</p>
												</div>
											);
										}
										return null;
									}}
								/>
								<Area
									type='monotone'
									dataKey='price'
									name='Price'
									stroke='#f97316'
									fillOpacity={1}
									fill='url(#colorPrice)'
									isAnimationActive={false}
								/>
							</AreaChart>
						</ChartContainer>
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
