import axios from 'axios';
export default request = axios.create({
	baseURL: 'https://6ca7-116-96-46-42.ngrok-free.app/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});
