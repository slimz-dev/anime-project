import MyAccount from '../screens/MyAccount/MyAccount';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HomeStack, MyAccountStack, NewsStack } from './stackNavigator';
import { screenBottomNavName } from '../config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const screenBottomNavigator = [
	{
		name: screenBottomNavName.Home,
		component: HomeStack,
		icon: ({ focused }) => (
			<Entypo name="home" size={24} color={focused ? 'orange' : 'white'} />
		),
	},
	{
		name: screenBottomNavName.MoviesUpdate,
		component: NewsStack,
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

function bottomNavigator(bottomNavigator) {
	return (
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
	);
}

export const BottomNavigator = () => bottomNavigator(screenBottomNavigator);
