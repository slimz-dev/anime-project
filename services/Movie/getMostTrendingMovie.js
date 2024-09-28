import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getTrendingMovie = async () => {
	try {
		const result = await request.get(`movies/most-viewed`);
		return {
			statusCode: result.status,
			data: result.data.data[0],
		};
	} catch (error) {
		return error.response.data;
	}
};
