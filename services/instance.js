import axios from 'axios';
export default request = axios.create({
	baseURL: 'https://ddb2-116-96-46-42.ngrok-free.app/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});
