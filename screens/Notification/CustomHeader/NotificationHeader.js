import { Text, View } from 'react-native';
import LeftButtonHeader from '../../../components/LeftButtonHeader/LeftButtonHeader';

export default NotificationHeader = () => {
	return (
		<LeftButtonHeader classname="justify-start">
			<View>
				<Text className="text-lg" style={{ color: 'orange' }}>
					Notification
				</Text>
			</View>
		</LeftButtonHeader>
	);
};
