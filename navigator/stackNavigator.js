import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenStackName } from '../config';
import MoviesUpdateScreen from '../screens/MoviesUpdate/MoviesUpdate';
import HomeScreen from '../screens/Home/Home';
import MyAccount from '../screens/MyAccount/MyAccount';
import Movie from '../screens/Movie/Movie';
import MovieHeader from '../screens/Movie/CustomHeader/MovieHeader';
import MoviesUpdateHeader from '../screens/MoviesUpdate/components/CustomHeader/MoviesUpdateHeader';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Start from '../screens/Start/Start';
import LoginHeader from '../screens/Login/components/CustomHeader/LoginHeader';
import RegisterHeader from '../screens/Register/CustomHeader/RegisterHeader';
const Stack = createNativeStackNavigator();

const homeStackNavigator = [
	{ name: screenStackName.Home, component: HomeScreen },
	{ name: 'Account', component: MyAccount },
	{ name: screenStackName.Movie, component: Movie },
];

const newsStackNavigator = [
	{
		name: screenStackName.MoviesUpdate,
		component: MoviesUpdateScreen,
		header: true,
		customHeader: MoviesUpdateHeader,
	},
	{ name: screenStackName.Movie, component: Movie, header: true, customHeader: MovieHeader },
];

export const authStackNavigator = [
	{ name: screenStackName.Start, component: Start, header: false },
	{
		name: screenStackName.Login,
		component: Login,
		header: false,
		customHeader: LoginHeader,
	},
	{
		name: screenStackName.Register,
		component: Register,
		header: false,
		customHeader: RegisterHeader,
	},
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
						options={{
							animation: 'slide_from_right',
						}}
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
				const CustomHeader = navigator.customHeader;
				return (
					<Stack.Screen
						key={index}
						name={navigator.name}
						component={navigator.component}
						options={{
							headerShown: navigator.header,
							animation: 'slide_from_right',
							headerBackVisible: false,
							headerTitle: () => {
								return CustomHeader && <CustomHeader />;
							},
						}}
					/>
				);
			})}
		</Stack.Navigator>
	);
}
