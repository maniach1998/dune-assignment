import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		COINCAP_API_KEY: process.env.COINCAP_API_KEY,
	},
};

export default nextConfig;
