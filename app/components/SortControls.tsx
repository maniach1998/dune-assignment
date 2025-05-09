'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortOrder, type RootState } from '@/app/store/store';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

export default function SortControls() {
	const dispatch = useDispatch();
	const { sortBy, sortOrder } = useSelector((state: RootState) => state.crypto);

	const toggleSortOrder = () => {
		dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
	};

	const handleSortByChange = (value: 'rank' | 'price' | 'change') => {
		dispatch(setSortBy(value));
	};

	return (
		<div className='flex flex-wrap items-center gap-2 mt-2'>
			<div className='flex items-center'>
				<span className='text-sm mr-2'>Sort by:</span>
				<div className='flex gap-1'>
					<Button
						variant={sortBy === 'rank' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleSortByChange('rank')}>
						Rank
					</Button>
					<Button
						variant={sortBy === 'price' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleSortByChange('price')}>
						Price
					</Button>
					<Button
						variant={sortBy === 'change' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleSortByChange('change')}>
						Change %
					</Button>
				</div>
			</div>

			<Button
				variant='outline'
				size='sm'
				onClick={toggleSortOrder}
				className='flex items-center gap-1'>
				{sortOrder === 'asc' ? (
					<>
						<ArrowUpIcon className='size-4' />
						Ascending
					</>
				) : (
					<>
						<ArrowDownIcon className='size-4' />
						Descending
					</>
				)}
			</Button>
		</div>
	);
}
