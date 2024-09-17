import { NavigationContainer } from '@react-navigation/native';

import { BottomNavigator } from './navigator/bottomNavigator';
import { AuthStack } from './navigator/stackNavigator';
import { useContext, useRef, useState } from 'react';
import AuthProvider from './context/AuthProvider/AuthProvider';
import { EventProvider } from 'react-native-outside-press';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const data = { isLoggedIn, setIsLoggedIn };

	return (
		<EventProvider>
			<AuthProvider value={data}>
				<NavigationContainer>
					{isLoggedIn ? <BottomNavigator /> : <AuthStack />}
				</NavigationContainer>
			</AuthProvider>
		</EventProvider>
	);
}
