import { View, ActivityIndicator } from 'react-native';

export default Loading = () => {
	return (
		<View className="flex-1 bg-black justify-center items-center">
			<ActivityIndicator size="large" color="orange" />
		</View>
	);
};
