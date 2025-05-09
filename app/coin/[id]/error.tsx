'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ChevronLeftIcon } from 'lucide-react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Coin page error:', error);
	}, [error]);

	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<Link
				href='/'
				className='inline-flex text-muted-foreground items-center text-sm mb-6 hover:opacity-70 transition-opacity'>
				<ChevronLeftIcon className='size-5 mr-2' /> Back to all cryptocurrencies
			</Link>

			<div className='flex flex-col items-center justify-center py-16 text-center'>
				<h1 className='text-4xl font-bold tracking-tight mb-4'>Something went wrong</h1>
				<p className='text-muted-foreground mb-8 max-w-md'>
					We encountered an error while loading this cryptocurrency's data.
				</p>
				<div className='flex gap-4'>
					<button
						onClick={reset}
						className='px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'>
						Try again
					</button>
					<Link
						href='/'
						className='px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors'>
						Go to Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}
