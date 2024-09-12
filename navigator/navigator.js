import HomeScreen from '../screens/Home/Home';
import MyAccount from '../screens/MyAccount/MyAccount';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HomeStack, TrendingStack } from './componentNavigator';
import { screenStackName, screenBottomNavName } from '../config';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Start from '../screens/Start/Start';
import LoginHeader from '../screens/Login/components/CustomHeader/LoginHeader';
import RegisterHeader from '../screens/Register/CustomHeader/RegisterHeader';

export const bottomNavigator = [
	{
		name: screenBottomNavName.Home,
		header: false,
		component: HomeStack,
		icon: (focused) => {
			return <Entypo name="home" size={24} color={focused ? 'orange' : 'white'} />;
		},
	},
	{
		name: screenBottomNavName.Trending,
		header: true,
		component: TrendingStack,
		icon: (focused) => {
			return (
				<MaterialIcons
					name="local-fire-department"
					size={24}
					color={focused ? 'orange' : 'white'}
				/>
			);
		},
	},
	{
		name: screenBottomNavName.account,
		header: true,
		component: MyAccount,
		icon: (focused) => {
			return (
				<FontAwesome6 name="user-secret" size={24} color={focused ? 'orange' : 'white'} />
			);
		},
	},
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
