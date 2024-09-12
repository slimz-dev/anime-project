import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
export default RegisterHeader = (data) => {
	const navigation = useNavigation();
	console.log(data);
	return (
		<View className="flex-1 h-14 bg-black justify-center" style={{ marginLeft: -16 }}>
			<Pressable
				className="self-start active:bg-slate-300 active:opacity-60 rounded-full p-1"
				onPress={() => navigation.goBack()}
			>
				<View>
					<Entypo name="chevron-left" size={30} color="white" />
				</View>
			</Pressable>
		</View>
	);
};
