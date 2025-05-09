import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReduxProvider } from './store/provider';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/shared/Footer';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Dune Crypto Market Tracker',
	description: 'Track top cryptocurrencies with real-time price updates',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<ReduxProvider>{children}</ReduxProvider>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
