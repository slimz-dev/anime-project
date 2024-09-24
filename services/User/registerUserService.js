import request from '../instance';
export const registerUser = async (user) => {
	try {
		const result = await request.post(`users/register`, user);
		return {
			statusCode: result.status,
			data: result.data.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
