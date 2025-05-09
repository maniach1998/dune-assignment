import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CryptoCurrency } from '../page';

// Types
export interface CryptoState {
	sortOrder: 'asc' | 'desc';
	sortBy: 'rank' | 'price' | 'change';
}

// Initial state
const initialState: CryptoState = {
	sortOrder: 'asc',
	sortBy: 'rank',
};

// Create slice
const cryptoSlice = createSlice({
	name: 'crypto',
	initialState,
	reducers: {
		setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
			state.sortOrder = action.payload;
		},
		setSortBy: (state, action: PayloadAction<'rank' | 'price' | 'change'>) => {
			state.sortBy = action.payload;
		},
	},
});

// Export actions
export const { setSortOrder, setSortBy } = cryptoSlice.actions;

// Configure store
export const store = configureStore({
	reducer: {
		crypto: cryptoSlice.reducer,
	},
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
