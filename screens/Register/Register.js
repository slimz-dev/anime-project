import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
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
import ToastManager, { Toast } from 'toastify-react-native';
import { registerUser } from '../../services/User/registerUserService';
export default Register = () => {
	const navigation = useNavigation();
	const [isSubmit, setIsSubmit] = useState(false);
	const [userInfo, setUserInfo] = useState({
		username: '',
		name: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	useEffect(() => {
		const register = async () => {
			const result = await registerUser(userInfo);
			if (result.statusCode === 201) {
				Toast.success('Account created successfully');
			} else {
				Toast.error(result.message);
			}
		};
		if (isSubmit) {
			register();
		}
	}, [isSubmit]);

	function handleSubmit() {
		if (userInfo.username && userInfo.name && userInfo.password) {
			if (confirmPassword.localeCompare(userInfo.password) === 0) {
				setIsSubmit(Math.random());
			} else {
				Toast.error('Incorrect password');
			}
		} else {
			Toast.error('All Fields are required');
		}
	}

	return (
		<View className="bg-black flex-1  relative">
			<ToastManager
				animationIn="fadeInDown"
				animationOut="bounceOutRight"
				animationInTiming={300}
				animationOutTiming={500}
				duration={2000}
				showCloseIcon={false}
				style={{
					backgroundColor: 'black',
				}}
				textStyle={{
					color: 'orange',
					fontSize: 10,
				}}
			/>
			<ImageBackground
				className="flex-1 justify-center items-center"
				source={require('../../assets/img/theatre.jpg')}
				resizeMode="cover"
				style={{ width: Dimensions.get('screen').width }}
			>
				<View className="absolute top-5 items-center justify-center">
					<Image source={require('../../assets/img/logo.png')} className="w-10 h-10" />
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
						value={userInfo.username}
						onChangeText={(text) =>
							setUserInfo((prev) => {
								return {
									...prev,
									username: text,
								};
							})
						}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<View className="mb-3 ">
					<Text className="text-white font-bold mb-1 text-xs">Name</Text>
					<TextInput
						caretHidden
						maxLength={40}
						value={userInfo.name}
						onChangeText={(text) =>
							setUserInfo((prev) => {
								return {
									...prev,
									name: text,
								};
							})
						}
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
						value={userInfo.password}
						onChangeText={(text) =>
							setUserInfo((prev) => {
								return {
									...prev,
									password: text,
								};
							})
						}
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
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
						className="bg-slate-800 border border-orange-500 text-white text-xs w-56 rounded-lg px-2 py-1"
					/>
				</View>
				<TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
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
