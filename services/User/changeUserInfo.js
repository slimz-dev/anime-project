import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const changeInfo = async (userID, data) => {
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	data.append('refreshToken', refreshToken);
	try {
		const result = await request.patch(`users/${userID}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return {
			statusCode: result.status,
			data: result.data.data,
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
