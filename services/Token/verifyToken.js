import myApi from '../instance';
import * as SecureStore from 'expo-secure-store';
export const verifyToken = async () => {
	try {
		const result = await myApi.post(
			`users/verify`,
			{
				headers: {
					Authorization:
						'Bearer ' + SecureStore.getItem('access_token', { options: true }),
				},
			},
			{
				refreshToken: SecureStore.getItem('refresh_token', { options: true }),
			}
		);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.message;
	}
};
