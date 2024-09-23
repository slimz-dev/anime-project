import myApi from '../instance';
import * as SecureStore from 'expo-secure-store';
export const fetchInfo = async () => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await myApi.post(`users/my-info`, {
			refreshToken,
		});

		return {
			statusCode: result.status,
			data: result.data.data,
			accessToken: result.data.meta.accessToken,
		};
	} catch (error) {
		return error.message;
	}
};

myApi.interceptors.request.use(async (req) => {
	const accessToken = await SecureStore.getItem('access_token', { options: true });
	req.headers.Authorization = `Bearer ${accessToken}`;

	return req;
});