import Link from 'next/link';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export type CryptoCurrency = {
	id: string;
	rank: string;
	symbol: string;
	name: string;
	supply: string;
	maxSupply: string;
	marketCapUsd: string;
	volumeUsd24Hr: string;
	priceUsd: string;
	changePercent24Hr: string;
	vwap24Hr: string;
	explorer: URL;
};

const getTopCrypto = async () => {
	const BASE_URL = 'https://rest.coincap.io/v3';

	const res = await fetch(`${BASE_URL}/assets?apiKey=${process.env.COINCAP_API_KEY}&limit=20`);
	const data = await res.json();

	return data.data;
};

export default async function Home() {
	const topCrypto = await getTopCrypto();

	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
				<h1 className='text-4xl font-bold tracking-tight'>Top Cryptocurrencies</h1>
				<p className='text-sm text-muted-foreground'>
					Showing top 20 cryptocurrencies by market cap
				</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				{topCrypto.map((currency: CryptoCurrency) => (
					<Card key={currency.id} className='overflow-hidden hover:shadow-md transition-shadow'>
						<Link
							href={`/coin/${currency.id}`}
							className='block h-full hover:opacity-100 transition-opacity'>
							<CardHeader className='pb-3'>
								<div className='flex justify-between items-start'>
									<div>
										<CardTitle>
											<h2 className='text-xl font-bold tracking-tight'>{currency.name}</h2>
										</CardTitle>
										<CardDescription className='flex items-center gap-2 mt-1'>
											<span className='font-mono'>{currency.symbol}</span>
											<span className='text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full'>
												#{currency.rank}
											</span>
										</CardDescription>
									</div>
								</div>
							</CardHeader>

							<CardContent className='pt-0'>
								<div className='flex justify-between items-baseline'>
									<p className='text-xl font-semibold tracking-tight font-mono'>
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
										}).format(Number(currency.priceUsd))}
									</p>

									<p
										className={cn(
											'text-sm font-mono inline-flex items-center gap-1',
											Number(currency.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'
										)}>
										{new Intl.NumberFormat('en-US', {
											style: 'percent',
											maximumFractionDigits: 2,
										}).format(Number(currency.changePercent24Hr) / 100)}

										{Number(currency.changePercent24Hr) > 0 ? (
											<TrendingUpIcon className='text-green-600 size-4' />
										) : (
											<TrendingDownIcon className='text-red-600 size-4' />
										)}
									</p>
								</div>
							</CardContent>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
}
