import { createContext, useEffect, useState } from 'react';
import { fetchInfo } from '../../services/User/getUserService';
import * as SecureStore from 'expo-secure-store';
import { verifyToken } from '../../services/Token/verifyToken';
import socket from '../../utils/socket';
import { getNotification } from '../../services/User/getNotification';
export const AuthContext = createContext();
export default AuthProvider = ({ children }) => {
	const [myInfo, setMyInfo] = useState({});
	const [notification, setNotification] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [logout, setLogout] = useState(false);
	const data = {
		isLoading,
		setIsLoading,
		logout: () => setLogout(!logout),
		state: {
			isLoggedIn,
			setIsLoggedIn,
		},
		user: {
			myInfo,
			setMyInfo,
			notification,
			setNotification,
		},
	};
	async function getUserInfo() {
		const alreadyLoggedIn = JSON.parse(
			await SecureStore.getItemAsync('alreadyLoggedIn', { options: true })
		);
		if (alreadyLoggedIn) {
			async function fetchUser() {
				const result = await fetchInfo();
				if (result.data && result.accessToken) {
					await SecureStore.setItemAsync('access_token', result.accessToken);
					const fetchNotification = async () => {
						const result = await getNotification();
						setNotification(result.data.list);
					};
					fetchNotification();
					socket.on('notification', (data) => {
						console.log('received notification');
						setNotification(data);
					});
					setMyInfo(() => {
						socket.emit('online', result.data._id);
						setIsLoggedIn(true);
						setIsLoading(false);
						return result.data;
					});
				} else {
					await SecureStore.deleteItemAsync('access_token');
					await SecureStore.deleteItemAsync('refresh_token');
					await SecureStore.deleteItemAsync('alreadyLoggedIn');
					setIsLoading(() => {
						setIsLoggedIn(false);
						return false;
					});
				}
			}
			fetchUser();
		} else {
			setIsLoading(false);
		}
	}

	function fetchAgain() {
		async function fetchUser() {
			const result = await fetchInfo();
			setMyInfo(result.data);
		}
		fetchUser();
	}
	useEffect(() => {
		getUserInfo();
		socket.on('user-info-changed', () => {
			fetchAgain();
		});
		socket.on('socketID', async (socketID) => {
			await SecureStore.setItemAsync('socketID', socketID);
			console.log(socketID);
		});
		socket.on('return-page', async () => {
			fetchAgain();
		});
	}, [logout]);
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
