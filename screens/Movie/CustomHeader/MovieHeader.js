import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
export default MovieHeader = (data) => {
	const navigation = useNavigation();
	return (
		<View
			className="flex-1 h-14 bg-black justify-center"
			style={{ marginLeft: -16, marginRight: 16 }}
		>
			<View className="flex-row items-center justify-between">
				<Pressable
					className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
					onPress={() => navigation.goBack()}
				>
					<Entypo name="chevron-left" size={30} color="white" />
				</Pressable>
				<View className="pr-2 flex-row">
					<View className="mr-3">
						<Pressable className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center">
							<Ionicons name="notifications" size={20} color="white" />
						</Pressable>
					</View>
					<Pressable className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center">
						<Entypo name="magnifying-glass" size={20} color="white" />
					</Pressable>
				</View>
			</View>
		</View>
	);
};
