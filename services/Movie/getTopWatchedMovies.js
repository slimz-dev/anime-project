import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getWatched = async () => {
	try {
		const result = await request.get(`movies/top-watched`);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
