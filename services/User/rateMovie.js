import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const rateMovie = async (movieID, stars) => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await request.post(`users/rate-movie/${movieID}`, {
			stars,
			refreshToken,
		});
		return {
			statusCode: result.status,
			data: result.data.message,
			accessToken: result.data.meta.accessToken,
		};
	} catch (error) {
		return {
			statusCode: error.response.status,
			data: error.response.data.message,
		};
	}
};
request.interceptors.request.use(async (req) => {
	const accessToken = await SecureStore.getItem('access_token', { options: true });
	req.headers.Authorization = `Bearer ${accessToken}`;

	return req;
});
