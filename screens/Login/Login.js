import { ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
export default LoginScreen = () => {
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
							<View style={st.loginFacebook}>
								<Image
									source={require('../../assets/facebook-brands.png')}
									style={{ width: 25, height: 25 }}
								/>
								<Text style={st.loginFacebookText}>Continue with Facebook</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8}>
							<View style={st.loginAccount}>
								<Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
									Login with account
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};
