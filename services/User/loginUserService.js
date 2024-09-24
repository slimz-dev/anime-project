import request from '../instance';
export const loginUser = async (user) => {
	try {
		const result = await request.post(`users/login`, user);
		return {
			statusCode: result.status,
			data: result.data.data,
			accessToken: result.data.meta.accessToken,
			refreshToken: result.data.meta.refreshToken,
		};
	} catch (error) {
		return error.response.data;
	}
};
