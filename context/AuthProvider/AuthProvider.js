import { createContext, useEffect, useState } from 'react';
import { fetchInfo } from '../../services/User/getUserService';
import * as SecureStore from 'expo-secure-store';
import { verifyToken } from '../../services/Token/verifyToken';
import socket from '../../utils/socket';
import { getNotification } from '../../services/User/getNotification';
export const AuthContext = createContext();
export default AuthProvider = ({ children }) => {
	const [myAccount, setMyAccount] = useState(null);
	const [isBiometric, setIsBiometric] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
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
		biometric: {
			isEnableBiometric: isBiometric,
			setIsEnableBiometric: async (value) => {
				await SecureStore.setItemAsync('biometric', value.toString());
				await SecureStore.setItemAsync('account', myInfo.username);
				setIsBiometric(value);
			},
			setIsVerified,
			myAccount,
		},
	};
	async function getUserInfo() {
		const alreadyLoggedIn = JSON.parse(
			await SecureStore.getItemAsync('alreadyLoggedIn', { options: true })
		);
		if (alreadyLoggedIn) {
			async function fetchUser() {
				const result = await fetchInfo();
				if (result?.data && result.accessToken) {
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
					await SecureStore.deleteItemAsync('account');
					await SecureStore.deleteItemAsync('biometric');
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
	const handleLogout = async () => {
		await SecureStore.deleteItemAsync('access_token');
		await SecureStore.deleteItemAsync('refresh_token');
		await SecureStore.deleteItemAsync('alreadyLoggedIn');
		await SecureStore.deleteItemAsync('account');
		await SecureStore.deleteItemAsync('biometric');
		setIsBiometric(false);
		setIsLoggedIn(false);
	};

	const getBiometricInfo = async () => {
		const isEnableBiometric = JSON.parse(
			await SecureStore.getItemAsync('biometric', { options: true })
		);
		if (isEnableBiometric) {
			const account = await SecureStore.getItemAsync('account');
			setIsLoading(() => {
				setMyAccount(account);
				setIsBiometric(true);
				setIsLoggedIn(false);
				return false;
			});
		} else {
			getUserInfo();
		}
	};

	function fetchAgain() {
		async function fetchUser() {
			const result = await fetchInfo();
			setMyInfo(result.data);
		}
		fetchUser();
	}

	// const handleBiometric = async () => {
	// 	await getBiometricInfo();
	// };
	useEffect(() => {
		if (isVerified) {
			getUserInfo();
		} else {
			getBiometricInfo();
		}
		if (logout) {
			handleLogout();
		}
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
	}, [logout, isVerified]);
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
