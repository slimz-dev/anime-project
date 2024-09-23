import myApi from '../instance';
export const loginUser = async (user) => {
	try {
		const result = await myApi.post(`users/login`, user);
		return {
			statusCode: result.status,
			data: result.data.data,
			accessToken: result.data.meta.accessToken,
			refreshToken: result.data.meta.refreshToken,
		};
	} catch (error) {
		return error.message;
	}
};
