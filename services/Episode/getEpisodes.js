import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getEpisodes = async (movieID) => {
	try {
		const result = await request.get(`episodes/${movieID}`);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
