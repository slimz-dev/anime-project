import { createContext, useEffect, useState } from 'react';
import { fetchInfo } from '../../services/User/getUserService';
import * as SecureStore from 'expo-secure-store';
import { verifyToken } from '../../services/Token/verifyToken';
export const AuthContext = createContext();
export default AuthProvider = ({ children }) => {
	const [myInfo, setMyInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const data = {
		isLoading,
		setIsLoading,
		state: {
			isLoggedIn,
			setIsLoggedIn,
		},
		user: {
			myInfo,
			setMyInfo,
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
					setMyInfo(() => {
						setIsLoggedIn(true);
						setIsLoading(false);
						return result.data;
					});
				} else {
					await SecureStore.deleteItemAsync('access_token');
					await SecureStore.deleteItemAsync('refresh_token');
					await SecureStore.deleteItemAsync('alreadyLoggedIn');
					setIsLoading(false);
				}
			}
			fetchUser();
		} else {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		getUserInfo();
	}, []);
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
