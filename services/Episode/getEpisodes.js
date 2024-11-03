import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getEpisodes = async (movieID) => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await request.get(`episodes/${movieID}`, {
			refreshToken,
		});
		console.log(JSON.stringify(result.data.data, 0, 3));
		return {
			statusCode: result.status,
			data: result.data.data,
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
