import MyAccount from '../screens/MyAccount/MyAccount';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HomeStack, MyAccountStack, TrendingStack } from './stackNavigator';
import { screenBottomNavName } from '../config';

export const bottomNavigator = [
	{
		name: screenBottomNavName.Home,
		component: HomeStack,
		icon: ({ focused }) => (
			<Entypo name="home" size={24} color={focused ? 'orange' : 'white'} />
		),
	},
	{
		name: screenBottomNavName.MoviesUpdate,
		component: TrendingStack,
		icon: ({ focused }) => (
			<MaterialIcons
				name="local-fire-department"
				size={24}
				color={focused ? 'orange' : 'white'}
			/>
		),
	},
	{
		name: screenBottomNavName.account,
		component: MyAccountStack,
		icon: ({ focused }) => (
			<FontAwesome6 name="user-secret" size={24} color={focused ? 'orange' : 'white'} />
		),
	},
];
