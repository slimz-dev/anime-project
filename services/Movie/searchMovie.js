import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const searchMovie = async (query) => {
	try {
		const result = await request.get(`movies/search`, {
			params: {
				query,
			},
		});
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
