import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
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
import { loginUser } from '../../services/User/loginUserService';
import { screenStackName } from '../../config';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import ToastManager, { Toast } from 'toastify-react-native';
export default Login = () => {
	const { user, state, setIsLoading } = useContext(AuthContext);
	const navigation = useNavigation();
	const [userAccount, setUserAccount] = useState({
		username: '',
		password: '',
	});
	const [isSubmit, setIsSubmit] = useState(false);

	const getDeviceID = async () => {
		let deviceID = await SecureStore.getItemAsync('deviceID', { options: true });
		if (deviceID) {
			return deviceID;
		}
		deviceID = Crypto.randomUUID();
		await SecureStore.setItemAsync('deviceID', deviceID);
		return deviceID;
	};
	async function fillForm() {
		const deviceID = await getDeviceID();
		const deviceName = Device.deviceName;
		const data = {
			...userAccount,
			deviceID,
			deviceName,
		};
		const login = async () => {
			const result = await loginUser(data);
			if (result.data) {
				setIsLoading(true);
				await SecureStore.setItemAsync('access_token', result.accessToken);
				await SecureStore.setItemAsync('refresh_token', result.refreshToken);
				await SecureStore.setItemAsync('alreadyLoggedIn', JSON.stringify(true));
				user.setMyInfo(() => {
					setIsLoading(false);
					state.setIsLoggedIn(true);
					return result.data;
				});
			} else {
				Toast.error(result.message);
			}
		};
		if (isSubmit) {
			login();
		}
	}
	useEffect(() => {
		fillForm();
	}, [isSubmit]);
	const handleSubmit = () => {
		if (userAccount.username && userAccount.password) {
			setIsSubmit(Math.random());
		} else {
			if (!userAccount.username) {
				Toast.error('You need to type the username first');
			}
			if (!userAccount.password) {
				Toast.error("Password can't empty");
			}
		}
	};
	return (
		<View className="bg-black flex-1  relative">
			<ToastManager
				animationIn="fadeInDown"
				animationOut="bounceOutRight"
				// showProgressBar={false}
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
					<Text className="text-orange-500 font-bold text-3xl ">Login</Text>
				</View>
				<View className="mb-3 ">
					<Text className="text-white font-bold mb-1 text-xs">Username</Text>
					<TextInput
						value={userAccount.username}
						onChangeText={(text) =>
							setUserAccount((prev) => {
								return { ...prev, username: text };
							})
						}
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
						value={userAccount.password}
						onChangeText={(text) =>
							setUserAccount((prev) => {
								return { ...prev, password: text };
							})
						}
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
				<TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
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
