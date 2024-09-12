import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { screenStackName } from '../../config';

import styles from './styles';
import { useState } from 'react';

export default StartScreen = () => {
	const [userInfo, setUserInfo] = useState();

	const navigation = useNavigation();
	const st = styles;
	return (
		<View style={st.container}>
			<ImageBackground
				source={require('../../assets/login.jpg')}
				resizeMode="cover"
				style={st.image}
				imageStyle={{ opacity: 0.6 }}
			>
				<View style={st.content}>
					<View style={st.Child}>
						<Text style={st.header}>Kmovie</Text>
						<Text style={st.slogan}>
							<Text>watch and </Text>
							<Text>chill tonight </Text>
						</Text>
					</View>

					<View style={st.Child}>
						<TouchableOpacity activeOpacity={0.8}>
							<View style={st.loginFacebook} className="bg-white">
								<Image
									source={require('../../assets/google.png')}
									style={{ width: 25, height: 25 }}
								/>
								<Text style={st.loginFacebookText}>Continue with Google</Text>
							</View>
						</TouchableOpacity>
						<View className="my-2">
							<Text className="text-white font-bold">Or</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => navigation.navigate(screenStackName.Login)}
						>
							<View style={st.loginAccount}>
								<Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
									Login with account
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			<StatusBar translucent={true} backgroundColor={'transparent'} />
		</View>
	);
};