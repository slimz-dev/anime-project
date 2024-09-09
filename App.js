import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomNavigator } from './navigator/navigator';

const Tab = createBottomTabNavigator();
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useRef } from 'react';
import { screenBottomNavName, screenStackName } from './config';
export default function App() {
	const isLogged = false;
	const routeRef = useRef();
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
							ref={routeRef}
							key={index}
							name={navigator.name}
							component={navigator.component}
							options={({ route }) => ({
								tabBarIcon: ({ focused, color, size }) => navigator.icon(focused),
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
	);
}
