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
export default Login = () => {
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
					<Text className="text-orange-500 font-bold text-3xl ">Login</Text>
				</View>
				<View className="mb-3 ">
					<Text className="text-white font-bold mb-1 text-xs">Username</Text>
					<TextInput
						caretHidden
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View>
					<View className="flex-row justify-between">
						<Text className="text-white font-bold mb-1 text-xs">Password</Text>
						<Text className="capitalize text-orange-500 font-bold text-xs underline">
							Forgot?
						</Text>
					</View>
					<TextInput
						caretHidden
						secureTextEntry
						blurOnSubmit
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View className="flex-row justify-start w-56 my-1 ">
					<Text className="text-xs text-black font-bold mr-1">or, Login with</Text>
					<Pressable
						className="active:bg-white rounded-full active:opacity-80"
						onPress={() => navigation.goBack()}
					>
						<Text className=" text-xs text-zinc-800 font-bold underline">Google</Text>
					</Pressable>
				</View>
				<TouchableOpacity activeOpacity={0.8}>
					<View className="w-56  bg-orange-500 rounded-md ">
						<Text className="text-black font-bold text-center py-2">Log in</Text>
					</View>
				</TouchableOpacity>
				<View className="flex-row absolute bottom-5">
					<Text className="text-orange-400 text-xs">Don't have an account?</Text>
					<Pressable
						className="active:bg-white rounded-full px-1 active:opacity-80"
						onPress={() => navigation.navigate(screenStackName.Register)}
					>
						<Text className="text-orange-500 text-xs underline font-bold">Sign up</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</View>
	);
};
