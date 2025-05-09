import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ErrorScreen from './Error/ErrorScreen';
export default request = axios.create({
	baseURL: `${process.env.APP_BACKEND_URL}/api/`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const errorHandler = (navigation) => {
	request.interceptors.response.use(
		async (res) => {
			return res;
		},
		async (err) => {
			if (err.status === 429) {
				navigation.navigate('hi');
			}
		}
	);
};
