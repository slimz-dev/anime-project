import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const queryMovieWithUpdateTime = async (query) => {
	try {
		const result = await request.get(`movies/update`, query);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
