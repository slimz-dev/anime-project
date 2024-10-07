import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getMovie = async (movieID) => {
	try {
		const result = await request.get(`movies/${movieID}`);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
