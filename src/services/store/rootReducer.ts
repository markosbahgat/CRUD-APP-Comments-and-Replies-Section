import { combineReducers } from '@reduxjs/toolkit';
import { FetchReducer } from '../slices/data.slice';
import { essentialReducer } from '../slices/essentials.slice';

const rootReducer = combineReducers({
	fetch: FetchReducer,
	essential: essentialReducer
});

export default rootReducer;
