import { useNavigation } from '@react-navigation/native';
import {
	Text,
	View,
	TextInput,
	Image,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import { screenStackName } from '../../config';
export default Register = () => {
	const navigation = useNavigation();
	return (
		<View className="bg-black flex-1  relative">
			<ImageBackground
				className="flex-1 justify-center items-center"
				source={require('../../assets/theatre.jpg')}
				resizeMode="cover"
				style={{ width: Dimensions.get('screen').width }}
			>
				<View className="absolute top-5 items-center justify-center">
					<Image source={require('../../assets/logo.png')} className="w-10 h-10" />
					<Text className="text-orange-500 text-center text-3xl capitalize">kmovie</Text>
				</View>
				<View className="mb-10">
					<Text className="text-orange-500 font-bold text-3xl capitalize ">
						create account
					</Text>
				</View>
				<View className="mb-3 ">
					<Text className="text-white font-bold mb-1 text-xs">Username</Text>
					<TextInput
						caretHidden
						maxLength={15}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View className="mb-3 ">
					<Text className="text-white font-bold mb-1 text-xs">Name</Text>
					<TextInput
						caretHidden
						maxLength={40}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View className="mb-3">
					<View className="flex-row justify-between">
						<Text className="text-white font-bold mb-1 text-xs">Password</Text>
					</View>
					<TextInput
						caretHidden
						secureTextEntry
						blurOnSubmit
						maxLength={10}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View className="mb-4">
					<View className="flex-row justify-between">
						<Text className="text-white font-bold mb-1 text-xs">Confirm password</Text>
					</View>
					<TextInput
						caretHidden
						secureTextEntry
						blurOnSubmit
						maxLength={10}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<TouchableOpacity activeOpacity={0.8}>
					<View className="w-56  bg-orange-500 rounded-md ">
						<Text className="text-black font-bold text-center py-2">Register</Text>
					</View>
				</TouchableOpacity>
				<View className="flex-row absolute bottom-5">
					<Text className="text-orange-500 text-xs">Already have an account?</Text>
					<Pressable
						className="active:bg-white rounded-full px-1 active:opacity-80"
						onPress={() => navigation.goBack()}
					>
						<Text className="text-orange-500 text-xs underline font-bold">Sign in</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</View>
	);
};
