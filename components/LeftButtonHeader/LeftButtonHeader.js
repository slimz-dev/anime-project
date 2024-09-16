import { useNavigation } from '@react-navigation/native';
import { View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import DefaultHeader from '../DefaultHeader/DefaultHeader';

export default LeftButtonHeader = ({ children, classname }) => {
	const navigation = useNavigation();
	return (
		<DefaultHeader>
			<View className={`flex-row items-center justify-between ${classname}`}>
				<Pressable
					className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
					onPress={() => navigation.goBack()}
				>
					<Entypo name="chevron-left" size={30} color="white" />
				</Pressable>
				{children}
			</View>
		</DefaultHeader>
	);
};
