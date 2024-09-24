import axios from 'axios';
export default request = axios.create({
	baseURL: 'https://3732-116-96-45-41.ngrok-free.app/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});
