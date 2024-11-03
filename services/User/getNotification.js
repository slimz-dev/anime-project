import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const getNotification = async () => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await request.get(`notifications/get-notifications`, {
			refreshToken,
		});
		return {
			statusCode: result.status,
			data: result.data.data,
			// accessToken: result.data.meta.accessToken,
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
