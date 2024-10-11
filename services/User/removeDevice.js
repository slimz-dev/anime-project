import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const removeDevice = async (userID) => {
	let deviceID = await SecureStore.getItemAsync('deviceID', { options: true });
	const refreshToken = await SecureStore.getItem('refresh_token', { options: true });
	try {
		const result = await request.patch(`users/remove-devices/${userID}`, {
			deviceID,
			refreshToken,
		});
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
