import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { authStackNavigator, bottomNavigator } from './navigator/navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useContext, useRef, useState } from 'react';
import { screenBottomNavName, screenStackName } from './config';
import Login from './screens/Start/Start';
import AuthProvider from './context/AuthProvider/AuthProvider';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const data = { isLoggedIn, setIsLoggedIn };
	function isStack(route) {
		const routeName = getFocusedRouteNameFromRoute(route);

		switch (route.name) {
			case screenBottomNavName.Trending: {
				if (routeName?.localeCompare(screenStackName.Trending) === 0) {
					return true;
				}
				break;
			}
			// case screenBottomNavName.account:
		}
		if (routeName) {
			return false;
		}
		return true;
	}

	return (
		<AuthProvider value={data}>
			{isLoggedIn ? (
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={() => ({
							tabBarStyle: {
								backgroundColor: 'black',
							},
						})}
					>
						{bottomNavigator.map((navigator, index) => {
							return (
								<Tab.Screen
									key={index}
									name={navigator.name}
									component={navigator.component}
									options={({ route }) => ({
										tabBarIcon: ({ focused, color, size }) =>
											navigator.icon(focused),
										tabBarActiveTintColor: 'orange',
										tabBarInactiveTintColor: 'white',
										headerShown: navigator.header && isStack(route),
										// headerTitle: isStack(route),
										headerStyle: {
											backgroundColor: 'black',
										},
										headerTintColor: 'orange',
										headerShadowVisible: false,
									})}
								/>
							);
						})}
					</Tab.Navigator>
				</NavigationContainer>
			) : (
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={() => ({
							tabBarStyle: {
								backgroundColor: 'black',
							},
						})}
					>
						{authStackNavigator.map((navigator, index) => {
							const CustomHeader = navigator.customHeader;
							const CustomHeaderLeft = navigator.back;
							return (
								<Stack.Screen
									key={index}
									name={navigator.name}
									component={navigator.component}
									options={{
										animation: 'slide_from_right',
										headerShown: navigator.header,
										headerBackVisible: false,
										headerTitle: (props) =>
											CustomHeader && <CustomHeader {...props} />,
									}}
								/>
							);
						})}
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</AuthProvider>
	);
}
