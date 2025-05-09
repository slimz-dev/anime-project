import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenStackName } from '../../config';
import MoviesUpdateScreen from '../../screens/MoviesUpdate/MoviesUpdate';
import HomeScreen from '../../screens/Home/Home';
import MyAccount from '../../screens/MyAccount/MyAccount';
import Movie from '../../screens/Movie/Movie';
import MovieHeader from '../../screens/Movie/CustomHeader/MovieHeader';
import MoviesUpdateHeader from '../../screens/MoviesUpdate/components/CustomHeader/MoviesUpdateHeader';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register/Register';
import Start from '../../screens/Start/Start';
import LoginHeader from '../../screens/Login/components/CustomHeader/LoginHeader';
import RegisterHeader from '../../screens/Register/CustomHeader/RegisterHeader';
import MyAccountHeader from '../../screens/MyAccount/components/CustomHeader/MyAccountHeader';
import AccountSetting from '../../screens/AccountSetting/AccountSetting';
import AccountSettingHeader from '../../screens/AccountSetting/components/CustomHeader/AccountSettingHeader';
import Ranking from '../../screens/Ranking/Ranking';
import RankingHeader from '../../screens/Ranking/components/CustomHeader/RankingHeader';
import HelpCenter from '../../screens/HelpCenter/HelpCenter';
import HelpCenterHeader from '../../screens/HelpCenter/components/CustomHeader/HelpCenterHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import MovieWrapper from '../../screens/Movie/components/MovieWrapper/MovieWrapper';
import { Search } from '../../screens/Search/Search';
import { Video } from '../../screens/Video/Video';
import Notification from '../../screens/Notification/Notification';
import NotificationHeader from '../../screens/Notification/CustomHeader/NotificationHeader';
import ErrorScreen from '../../services/Error/ErrorScreen';
const Stack = createNativeStackNavigator();

const homeStackNavigator = [
	{ name: screenStackName.Home, component: HomeScreen, header: false },
	{ name: 'Account', component: MyAccount, header: false },
	{
		name: screenStackName.Movie,
		component: MovieWrapper,
		header: true,
		customHeader: MovieHeader,
	},
	{ name: screenStackName.Search, component: Search, header: false },
	{ name: screenStackName.Video, component: Video, header: false },
	{
		name: screenStackName.Notification,
		component: Notification,
		header: true,
		customHeader: NotificationHeader,
	},
	{
		name: 'hi',
		component: ErrorScreen,
		header: false,
	},
];

const newsStackNavigator = [
	{
		name: screenStackName.MoviesUpdate,
		component: MoviesUpdateScreen,
		header: true,
		customHeader: MoviesUpdateHeader,
	},
	{
		name: screenStackName.Movie,
		component: MovieWrapper,
		header: true,
		customHeader: MovieHeader,
	},
	{ name: screenStackName.Search, component: Search, header: false },
	{ name: screenStackName.Video, component: Video, header: false },
	{
		name: screenStackName.Notification,
		component: Notification,
		header: true,
		customHeader: NotificationHeader,
	},
];

const myAccountStackNavigator = [
	{
		name: screenStackName.MyAccount,
		component: MyAccount,
		header: true,
		customHeader: MyAccountHeader,
	},
	{
		name: screenStackName.AccountSetting,
		component: AccountSetting,
		header: true,
		customHeader: AccountSettingHeader,
	},
	{
		name: screenStackName.Ranking,
		component: Ranking,
		header: true,
		customHeader: RankingHeader,
	},
	{
		name: screenStackName.HelpCenter,
		component: HelpCenter,
		header: true,
		customHeader: HelpCenterHeader,
		icon: ({ size = '24', color = 'black' }) => (
			<AntDesign name="questioncircleo" size={size} color={color} />
		),
	},
	{ name: screenStackName.Search, component: Search, header: false },
	{
		name: screenStackName.Movie,
		component: MovieWrapper,
		header: true,
		customHeader: MovieHeader,
	},
	{ name: screenStackName.Video, component: Video, header: false },
	{
		name: screenStackName.Notification,
		component: Notification,
		header: true,
		customHeader: NotificationHeader,
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

function StackComponent(stackNavigator) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{stackNavigator.map((navigator, index) => {
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

export const HomeStack = () => StackComponent(homeStackNavigator);
export const NewsStack = () => StackComponent(newsStackNavigator);
export const MyAccountStack = () => StackComponent(myAccountStackNavigator);
export const AuthStack = () => StackComponent(authStackNavigator);
