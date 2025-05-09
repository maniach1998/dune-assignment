'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { type RootState } from '@/app/store/store';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type CryptoCurrency } from '../page';

interface CryptoCurrencyListProps {
	cryptoList: CryptoCurrency[];
}

export default function CryptoCurrencyList({ cryptoList }: CryptoCurrencyListProps) {
	const { sortBy, sortOrder } = useSelector((state: RootState) => state.crypto);

	// Sort the crypto list based on the current sort settings
	const sortedCryptoList = [...cryptoList].sort((a, b) => {
		let comparison = 0;

		if (sortBy === 'rank') {
			comparison = Number(a.rank) - Number(b.rank);
		} else if (sortBy === 'price') {
			comparison = Number(a.priceUsd) - Number(b.priceUsd);
		} else if (sortBy === 'change') {
			comparison = Number(a.changePercent24Hr) - Number(b.changePercent24Hr);
		}

		return sortOrder === 'asc' ? comparison : -comparison;
	});

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{sortedCryptoList.map((currency: CryptoCurrency) => (
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
	);
}
