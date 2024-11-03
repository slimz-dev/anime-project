import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import TimeAgo from '../../components/TimeAgo/TimeAgo';
import { screenStackName } from '../../config';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { getNotification } from '../../services/User/getNotification';
import socket from '../../utils/socket';

export default Notification = () => {
	const { user } = useContext(AuthContext);
	const navigation = useNavigation();
	const date = new Date();
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(user.notification);
	}, [user.notification]);
	const handleShowNoti = (item) => {
		socket.emit('press-notification', {
			userID: user.myInfo._id,
			notificationID: item._id,
		});
		navigation.push(screenStackName.Movie, { movieID: item.link });
	};
	const checkNoti = (item) => {
		if (!item.isSeen) {
			return true;
		}
		return false;
	};
	return (
		<View className="flex-1 bg-black pt-3">
			<FlatList
				data={data}
				renderItem={({ item }) => {
					return (
						<Pressable onPress={() => handleShowNoti(item)}>
							<View className="flex-row items-center px-3 mb-4 bg-gray-700 mt-2 p-2 mx-3 rounded-3xl relative">
								<Image
									source={require('../../assets/img/logo.png')}
									className="w-8 h-8 mr-2 rounded-lg"
								/>
								<View className="w-10/12">
									<Text className="text-white text-xs w-full">
										{item.content}
									</Text>
									<TimeAgo
										date={item.createdAt}
										classname="text-white opacity-60 text-xs"
									/>
								</View>
								{checkNoti(item) && (
									<View className="absolute bg-red-600 w-4 h-4 rounded-full right-4 -top-2" />
								)}
							</View>
						</Pressable>
					);
				}}
			/>
		</View>
	);
};
