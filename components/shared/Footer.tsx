import { ThemeToggle } from '../ThemeToggle';

export default function Footer() {
	return (
		<footer className='bg-foreground/10 backdrop-blur-sm'>
			<div className='container mx-auto px-4 py-6 max-w-6xl flex gap-2 justify-between items-center'>
				<div className='text-pretty'>
					<p className='text-sm text-muted-foreground'>
						&copy; {new Date().getFullYear()} Dune Crypto Market Tracker. All rights reserved.
					</p>
					<p className='text-sm text-muted-foreground'>Made with ❤️ by Manas Acharekar</p>
				</div>

				<ThemeToggle />
			</div>
		</footer>
	);
}
