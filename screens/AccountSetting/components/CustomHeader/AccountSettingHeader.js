import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import LeftButtonHeader from '../../../../components/LeftButtonHeader/LeftButtonHeader';
import { screenStackName } from '../../../../config';
export default AccountSettingHeader = (data) => {
	const navigation = useNavigation();
	return (
		<LeftButtonHeader>
			<Text className="text-xl flex-1" style={{ color: 'orange' }}>
				Account
			</Text>
			<View className="pr-2 flex-row">
				<View className="mr-3">
					<Pressable className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center">
						<Ionicons name="notifications" size={20} color="white" />
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
