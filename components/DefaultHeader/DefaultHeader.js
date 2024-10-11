import { View } from 'react-native';

export default DefaultHeader = ({ children }) => {
	return (
		<View
			className="flex-1 h-14 bg-black  justify-center "
			style={{ marginLeft: -16, marginRight: 16 }}
		>
			{children}
		</View>
	);
};
