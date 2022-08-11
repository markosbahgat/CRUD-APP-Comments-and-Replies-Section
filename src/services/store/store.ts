import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { getAllComments } from 'middleware';
import rootReducer from './rootReducer';

export const store = configureStore({
	reducer: {
		root: rootReducer
	}
});

store.dispatch(getAllComments());
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
