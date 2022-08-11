import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllComments = createAsyncThunk('fetch/comments', async () => {
	try {
		const response = await axios.get('data.json');
		return await response.data;
	} catch (error: any) {
		return error;
	}
});
