import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function CoinNotFound() {
	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<Link
				href='/'
				className='inline-flex text-muted-foreground items-center text-sm mb-6 hover:opacity-70 transition-opacity'>
				<ChevronLeftIcon className='size-5 mr-2' /> Back to all cryptocurrencies
			</Link>

			<div className='flex flex-col items-center justify-center py-16 text-center'>
				<h1 className='text-4xl font-bold tracking-tight mb-4'>Cryptocurrency Not Found</h1>
				<p className='text-muted-foreground mb-8 max-w-md'>
					The cryptocurrency you&apos;re looking for doesn&apos;t exist or is not available through
					the CoinCap API.
				</p>
				<Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
					View Available Cryptocurrencies
				</Link>
			</div>
		</div>
	);
}
