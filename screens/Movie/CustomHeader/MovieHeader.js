import { useNavigation } from '@react-navigation/native';
import { View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import LeftButtonHeader from '../../../components/LeftButtonHeader/LeftButtonHeader';
import { screenStackName } from '../../../config';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
export default MovieHeader = (data) => {
	const { user } = useContext(AuthContext);
	const navigation = useNavigation();
	const checkNoti = () => {
		const found = user.notification.find((noti) => {
			return noti.isSeen === false;
		});
		if (found) {
			return true;
		}
		return false;
	};
	return (
		<LeftButtonHeader>
			<View className="pr-2 flex-row">
				<View className="mr-3">
					<Pressable
						className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center relative"
						onPress={() => navigation.navigate(screenStackName.Notification)}
					>
						<Ionicons name="notifications" size={20} color="white" />
						{checkNoti() && (
							<View className="absolute bg-red-600 w-3 h-3 rounded-full right-0 -top-0" />
						)}
					</Pressable>
				</View>
				<Pressable
					className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
					onPress={() => navigation.navigate(screenStackName.Search)}
				>
					<Entypo name="magnifying-glass" size={20} color="white" />
				</Pressable>
			</View>
		</LeftButtonHeader>
	);
};
