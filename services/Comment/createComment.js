import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const createComment = async (movieID, data) => {
	try {
		const result = await request.post(`comments/${movieID}`, data);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
