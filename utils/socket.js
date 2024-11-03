import io from 'socket.io-client';
const SOCKET_SERVER_URL = 'https://510e-116-96-44-101.ngrok-free.app';
export default socket = io(SOCKET_SERVER_URL);
