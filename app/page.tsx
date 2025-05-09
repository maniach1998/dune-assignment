import SortControls from './components/SortControls';
import CryptoCurrencyList from './components/CryptoCurrencyList';

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
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
				<h1 className='text-4xl font-bold tracking-tight'>Top Cryptocurrencies</h1>
				<p className='text-sm text-muted-foreground'>
					Showing top 20 cryptocurrencies by market cap
				</p>
			</div>

			{/* Sorting controls */}
			<SortControls />

			{/* Cryptocurrency list */}
			<div className='py-6'>
				<CryptoCurrencyList cryptoList={topCrypto} />
			</div>
		</div>
	);
}
