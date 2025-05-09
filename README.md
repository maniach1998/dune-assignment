# Dune Crypto Market Tracker Application

A modern cryptocurrency tracking application built with Next.js, TypeScript, TailwindCSS, and Redux.
(a part of the Dune Security Technical Assignment)

## Features

- **Server-side rendering** with Next.js for improved performance and SEO
- **Responsive design** using TailwindCSS and Shadcn UI components
- **Real-time price updates** polling the CoinCap API every 5 seconds
- **Interactive price charts** showing historical cryptocurrency data
- **State management** with Redux for sorting and filtering functionality
- **Detailed information pages** for each cryptocurrency

## Architecture and Approach

The application follows a modern React architecture using Next.js App Router:

- **Server-Side Rendering (SSR)** for initial data loading, improving SEO and performance
- **Client-Side Rendering (CSR)** for interactive components like price charts and real-time updates
- **API Routes** as a backend layer to communicate with the CoinCap API
- **Redux** for global state management, particularly for sorting preferences
- **Component-Based Design** with reusable UI components using Shadcn UI and TailwindCSS
- **Responsive Layout** built with TailwindCSS's mobile-first approach
- **TypeScript** for strong typing throughout the codebase

## Assumptions and Trade-offs

1. **Static Homepage Rendering**: The homepage is rendered as a static page with the top 20 cryptocurrencies. The CoinCap API updates prices approximately every 30 seconds, so a revalidation period of 30 seconds is set to rebuild the static page with fresh data.

2. **API Polling Strategy**: The price chart component polls the backend API route every 5 seconds for real-time updates, but the API route has a cache revalidation duration of 30 seconds when querying the CoinCap API. This trade-off balances fresh data with API rate limits and credit consumption.

3. **UI Component Library**: Shadcn components are used as building blocks to accelerate development. They're built on TailwindCSS, which is also used throughout the application for responsive design.

4. **Future Improvements**: Due to time constraints, one area for improvement would be using Redux to store historical data for previously viewed coins. This would reduce API calls by caching historical data for coins the user has already visited.

## Technologies Used

- **Next.js 15.3.2** - React framework with SSR and App Router
- **TypeScript** - Static type checking
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Recharts** - Charting library for price history visualization
- **CoinCap API** - Cryptocurrency data source

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env.local` file in the root directory with your CoinCap API key:

```
COINCAP_API_KEY=your_api_key_here
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Application Structure

- `/app` - Main application code using Next.js App Router
- `/app/page.tsx` - Homepage displaying top 20 cryptocurrencies
- `/app/coin/[id]/page.tsx` - Detailed coin page with price chart and statistics
- `/app/components` - Reusable UI components
- `/app/store` - Redux store configuration

## Deployment

### Deploy on Vercel

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Add your `COINCAP_API_KEY` as an environment variable
4. Deploy

For more detailed instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
