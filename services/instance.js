import axios from 'axios';
export default myApi = axios.create({
	baseURL: ' https://dd8b-116-96-45-41.ngrok-free.app/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});

// headers: {
// 	'Content-Type': 'application/json',
// },
