import { Dimensions, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	image: {
		flex: 1,
		alignItems: 'center',
		width: Dimensions.get('window').width + 120,
		height: '100%',
		paddingHorizontal: 130,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 40,
		alignItems: 'center',
	},
	Child: {
		alignItems: 'center',
		marginLeft: -120,
	},
	header: {
		fontSize: 25,
		color: 'orange',
	},
	slogan: {
		textAlign: 'center',
		color: 'orange',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	loginFacebook: {
		backgroundColor: 'rgb(0, 100, 255)',
		width: 300,
		height: 30,
		borderRadius: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	loginFacebookText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 12,
		marginRight: 65,
	},
	loginAccount: {
		backgroundColor: 'rgb(60, 60 , 60)',
		width: 300,
		height: 30,
		borderRadius: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
