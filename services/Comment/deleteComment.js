import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const deleteComment = async (commentID) => {
	try {
		const result = await request.delete(`comments/delete-comment`, {
			data: commentID,
		});
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
