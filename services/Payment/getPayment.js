import request from '../instance';
import * as SecureStore from 'expo-secure-store';
export const createPayment = async (data) => {
	try {
		const result = await request.post(`payment/create-payment`, data);
		return {
			statusCode: result.status,
			data: result.data,
		};
	} catch (error) {
		return error.response.data;
	}
};
