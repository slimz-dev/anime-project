import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const followMovie = async (movieID) => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await request.post(`users/follow-movie/`, {
			movieID,
			refreshToken,
		});
		return {
			statusCode: result.status,
			data: result.data.message,
			accessToken: result.data.meta.accessToken,
		};
	} catch (error) {
		return error.response.data;
	}
};
request.interceptors.request.use(async (req) => {
	const accessToken = await SecureStore.getItem('access_token', { options: true });
	req.headers.Authorization = `Bearer ${accessToken}`;

	return req;
});

// request.interceptors.response.use(
// 	async (response) => {
// 		// Check if the response has a new access token
// 		const newAccessToken = response.data.meta.accessToken;
// 		if (newAccessToken) {
// 			await SecureStore.setItem('access_token', newAccessToken);
// 		}
// 		return response;
// 	},
// 	(error) => {
// 		// Handle response errors
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );
