import axios from 'axios';
export default request = axios.create({
	baseURL: 'https://510e-116-96-44-101.ngrok-free.app/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});
