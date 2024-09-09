import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
	container: { backgroundColor: 'black', flex: 1, paddingHorizontal: 10 },
	topic: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'orange',
		color: 'white',
		borderWidth: 1,
		borderRadius: 20,
		padding: 4,
		paddingHorizontal: 8,
	},
	imageContainer: {
		width: '90%',
		height: Dimensions.get('window').height - 220,
		marginHorizontal: 'auto',
		position: 'relative',
	},
	image: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 10,
		overflow: 'hidden',
	},
	imageInfo: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	movieTypes: {
		flex: 1,
		width: '95%',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-evenly',
		marginBottom: 10,
		marginTop: 20,
	},
	imageButton: {
		flexDirection: 'row',
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
		// paddingHorizontal: 20,
		paddingVertical: 3,
		borderRadius: 2,
	},
});
