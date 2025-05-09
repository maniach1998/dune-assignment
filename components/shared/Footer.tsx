import { ThemeToggle } from '../ThemeToggle';

export default function Footer() {
	return (
		<footer className='bg-foreground/10 backdrop-blur-sm'>
			<div className='container mx-auto px-4 py-6 max-w-6xl flex gap-2 justify-between items-center'>
				<div className='text-pretty'>
					<p className='text-sm text-muted-foreground'>
						&copy; {new Date().getFullYear()} Dune Crypto Market Tracker. All rights reserved.
					</p>
					<p className='text-sm text-muted-foreground'>
						Made with ❤️ by{' '}
						<a
							href='https://manas.gg'
							rel='noopener noreferrer'
							target='_blank'
							className='hover:opacity-70 transition-opacity underline underline-offset-4'>
							Manas Acharekar
						</a>
					</p>
				</div>

				<ThemeToggle />
			</div>
		</footer>
	);
}
