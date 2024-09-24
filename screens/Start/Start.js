import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { screenStackName } from '../../config';

import styles from './styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

export default StartScreen = () => {
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
								<Text
									style={st.loginFacebookText}
									// onPress={() => setIsLoggedIn(true)}
								>
									Continue with Google
								</Text>
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
			<StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
		</View>
	);
};
