import Link from 'next/link';
import { ArrowUpRightIcon, ChevronLeftIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { type CryptoCurrency } from '../../page';
import PriceChart from './components/PriceChart';

const getCoin = async (id: string): Promise<CryptoCurrency | null> => {
	const BASE_URL = 'https://rest.coincap.io/v3';

	try {
		const res = await fetch(`${BASE_URL}/assets/${id}?apiKey=${process.env.COINCAP_API_KEY}`);

		if (!res.ok) {
			// If API returns an error (like 404 for non-existent coin)
			return null;
		}

		const data = await res.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching coin ${id}:`, error);
		return null;
	}
};

export default async function CoinPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const coin = await getCoin(id);

	// If the coin doesn't exist, show the 404 page
	if (!coin) {
		notFound();
	}

	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<Link
				href='/'
				className='inline-flex text-muted-foreground items-center text-sm mb-6 hover:opacity-70 transition-opacity'>
				<ChevronLeftIcon className='size-5 mr-2' /> Back to all cryptocurrencies
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Header section */}
				<div className='lg:col-span-3'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
						<div>
							<h1 className='text-4xl font-bold tracking-tight'>{coin.name}</h1>
							<div className='flex items-center gap-2 mt-1'>
								<p className='text-sm text-muted-foreground font-mono'>{coin.symbol}</p>
								<p className='text-sm text-muted-foreground font-mono'>Rank #{coin.rank}</p>
								{coin.explorer && (
									<a
										href={coin.explorer.toString()}
										target='_blank'
										rel='noopener noreferrer'
										className='text-sm inline-flex items-center gap-1 text-blue-500 hover:underline'>
										Explorer <ArrowUpRightIcon className='size-4' />
									</a>
								)}
							</div>
						</div>
						<div className='flex flex-col items-end'>
							<p className='text-3xl font-semibold tracking-tight font-mono'>
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
								}).format(Number(coin.priceUsd))}
							</p>
							<p
								className={cn(
									'text-sm font-mono inline-flex items-center gap-1',
									Number(coin.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'
								)}>
								{new Intl.NumberFormat('en-US', {
									style: 'percent',
									maximumFractionDigits: 2,
								}).format(Number(coin.changePercent24Hr) / 100)}

								{Number(coin.changePercent24Hr) > 0 ? (
									<TrendingUpIcon className='text-green-600 size-4' />
								) : (
									<TrendingDownIcon className='text-red-600 size-4' />
								)}
							</p>
						</div>
					</div>
				</div>

				{/* Price Chart - History Data */}
				<PriceChart coinId={id} name={coin.name} symbol={coin.symbol} />

				{/* Market data */}
				<Card className='lg:col-span-2'>
					<CardHeader>
						<CardTitle>
							<h3 className='text-xl font-bold tracking-tight'>Market Data</h3>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div className='space-y-3'>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>Market Cap</p>
									<p className='font-mono text-lg'>
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(Number(coin.marketCapUsd))}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>Volume (24h)</p>
									<p className='font-mono text-lg'>
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(Number(coin.volumeUsd24Hr))}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>VWAP (24h)</p>
									<p className='font-mono text-lg'>
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(Number(coin.vwap24Hr))}
									</p>
								</div>
							</div>
							<div className='space-y-3'>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>Supply</p>
									<p className='font-mono text-lg'>
										{new Intl.NumberFormat('en-US').format(Number(coin.supply))} {coin.symbol}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>Max Supply</p>
									<p className='font-mono text-lg'>
										{!coin.maxSupply
											? 'Unlimited'
											: `${new Intl.NumberFormat('en-US').format(Number(coin.maxSupply))} ${
													coin.symbol
											  }`}
									</p>
								</div>
								<div>
									<p className='text-sm font-medium text-muted-foreground'>% of Max Supply</p>
									<p className='font-mono text-lg'>
										{!coin.maxSupply
											? 'N/A'
											: new Intl.NumberFormat('en-US', {
													style: 'percent',
													maximumFractionDigits: 2,
											  }).format(Number(coin.supply) / Number(coin.maxSupply))}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Additional stats */}
				<Card>
					<CardHeader>
						<CardTitle>
							<h3 className='text-xl font-bold tracking-tight'>Price Statistics</h3>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							<div className='flex justify-between'>
								<p className='text-sm font-medium text-muted-foreground'>Price</p>
								<p className='font-mono'>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(Number(coin.priceUsd))}
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-sm font-medium text-muted-foreground'>24h Change</p>
								<p
									className={cn(
										'font-mono',
										Number(coin.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'
									)}>
									{new Intl.NumberFormat('en-US', {
										style: 'percent',
										maximumFractionDigits: 2,
									}).format(Number(coin.changePercent24Hr) / 100)}
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-sm font-medium text-muted-foreground'>24h VWAP</p>
								<p className='font-mono'>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(Number(coin.vwap24Hr))}
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-sm font-medium text-muted-foreground'>Market Rank</p>
								<p className='font-mono'>#{coin.rank}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
