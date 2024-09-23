import { BottomNavigator } from './navigator/bottomNavigator/bottomNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './navigator/stackNavigator/stackNavigator';
import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider/AuthProvider';
import { EventProvider } from 'react-native-outside-press';
import Loading from './screens/LoadingScreen/Loading';
export default function MyApp() {
	const { isLoading, state } = useContext(AuthContext);
	return (
		<EventProvider>
			{isLoading ? (
				<Loading />
			) : (
				<NavigationContainer>
					{state.isLoggedIn ? <BottomNavigator /> : <AuthStack />}
				</NavigationContainer>
			)}
		</EventProvider>
	);
}
