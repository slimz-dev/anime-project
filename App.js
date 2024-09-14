import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { authStackNavigator, bottomNavigator } from './navigator/bottomNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useRef, useState } from 'react';
import { screenBottomNavName, screenStackName } from './config';
import Login from './screens/Start/Start';
import AuthProvider from './context/AuthProvider/AuthProvider';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const data = { isLoggedIn, setIsLoggedIn };

	return (
		<AuthProvider value={data}>
			<NavigationContainer>
				{isLoggedIn ? (
					<Tab.Navigator
						screenOptions={() => ({
							tabBarStyle: {
								backgroundColor: 'black',
							},
						})}
					>
						{bottomNavigator.map((navigator, index) => {
							const NavigatorIcon = navigator.icon;
							return (
								<Tab.Screen
									key={index}
									name={navigator.name}
									component={navigator.component}
									options={({ route }) => ({
										tabBarIcon: ({ focused, color, size }) => (
											<NavigatorIcon focused={focused} />
										),
										tabBarActiveTintColor: 'orange',
										headerShown: false,
										tabBarInactiveTintColor: 'white',
									})}
								/>
							);
						})}
					</Tab.Navigator>
				) : (
					<Stack.Navigator
						screenOptions={() => ({
							tabBarStyle: {
								backgroundColor: 'black',
							},
						})}
					>
						{authStackNavigator.map((navigator, index) => {
							const CustomHeader = navigator.customHeader;
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
				)}
			</NavigationContainer>
		</AuthProvider>
	);
}
