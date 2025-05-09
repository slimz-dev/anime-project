import io from 'socket.io-client';
const SOCKET_SERVER_URL = process.env.APP_BACKEND_URL;
export default socket = io(SOCKET_SERVER_URL);
