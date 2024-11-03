import { BottomNavigator } from './navigator/bottomNavigator/bottomNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './navigator/stackNavigator/stackNavigator';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider/AuthProvider';
import { EventProvider } from 'react-native-outside-press';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Loading from './screens/LoadingScreen/Loading';
import socket from './utils/socket';
import { AppState } from 'react-native';

export default function MyApp() {
	const { isLoading, state } = useContext(AuthContext);
	const [appState, setAppState] = useState(AppState.currentState);
	useEffect(() => {
		// Function to handle state changes
		const handleAppStateChange = (nextAppState) => {
			if (appState.match(/inactive|background/) && nextAppState === 'active') {
				console.log('App has come to the foreground!');
			} else if (nextAppState === 'background') {
				console.log('App has gone to the background.');
			}
			setAppState(nextAppState); // Update the state with the new app state
		};

		// Listen to app state changes
		const subscription = AppState.addEventListener('change', handleAppStateChange);

		// Clean up the listener on component unmount
		return () => {
			subscription.remove();
		};
	}, [appState]);
	return (
		<AlertNotificationRoot theme="dark">
			<EventProvider>
				{isLoading ? (
					<Loading />
				) : (
					<NavigationContainer>
						{state.isLoggedIn ? <BottomNavigator /> : <AuthStack />}
					</NavigationContainer>
				)}
			</EventProvider>
		</AlertNotificationRoot>
	);
}
