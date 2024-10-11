import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { screenStackName } from '../../../../config';

export default MoviesUpdateHeader = (data) => {
	const navigation = useNavigation();
	return (
		<View
			className="flex-1 h-14 bg-black justify-center"
			style={{ marginLeft: -16, marginRight: 16 }}
		>
			<View className="flex-row justify-between  items-center px-2">
				<Text style={{ color: 'orange' }} className=" text-xl ">
					{screenStackName.MoviesUpdate}
				</Text>
				<Pressable
					className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
					onPress={() => navigation.navigate(screenStackName.Search)}
				>
					<Entypo name="magnifying-glass" size={20} color="white" />
				</Pressable>
			</View>
		</View>
	);
};
