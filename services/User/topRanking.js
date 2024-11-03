import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getTopRank = async () => {
	try {
		const result = await request.get(`users/top-rank`);
		return {
			statusCode: result.status,
			data: result.data.data,
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
