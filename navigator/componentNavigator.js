import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenStackName } from '../config';
import TrendingScreen from '../screens/TrendingMovie/Trending';
import HomeScreen from '../screens/Home/Home';
import MyAccount from '../screens/MyAccount/MyAccount';
import Movie from '../screens/Movie/Movie';
const Stack = createNativeStackNavigator();

const homeStackNavigator = [
	{ name: screenStackName.Home, component: HomeScreen },
	{ name: 'Account', component: MyAccount },
	{ name: screenStackName.Movie, component: Movie },
];

const newsStackNavigator = [
	{ name: screenStackName.Trending, component: TrendingScreen, header: false },
	{ name: screenStackName.Movie, component: Movie, header: true },
];

export function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{homeStackNavigator.map((navigator, index) => {
				return (
					<Stack.Screen
						key={index}
						name={navigator.name}
						component={navigator.component}
					/>
				);
			})}
		</Stack.Navigator>
	);
}

export function TrendingStack() {
	return (
		<Stack.Navigator>
			{newsStackNavigator.map((navigator, index) => {
				return (
					<Stack.Screen
						key={index}
						name={navigator.name}
						component={navigator.component}
						options={{
							headerShown: navigator.header,
						}}
					/>
				);
			})}
		</Stack.Navigator>
	);
}
