import { useContext, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { AuthContext } from '../../../../../../context/AuthProvider/AuthProvider';
import { createPayment } from '../../../../../../services/Payment/getPayment';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import socket from '../../../../../../utils/socket';
import { useNavigation } from '@react-navigation/native';
export const RowBalance = ({ data }) => {
	const navigation = useNavigation();
	const { user } = useContext(AuthContext);
	const handlePayment = async (price) => {
		const newPrice = price.split('.').join('').split('Đ')[0];
		const socketID = await SecureStore.getItem('socketID');
		console.log(socketID);
		const data = {
			userID: user.myInfo._id,
			amount: Number(newPrice),
			socketID,
		};
		const result = await createPayment(data);
		await WebBrowser.openBrowserAsync(result.data.order_url);
	};
	return (
		<View className="flex-row mb-2">
			{data.map((item, index) => {
				return (
					<View
						key={index}
						className="bg-black flex-1 rounded-xl "
						style={{ marginRight: index !== data.length - 1 ? 8 : 0 }}
					>
						<Pressable
							className="active:opacity-60"
							onPress={() => handlePayment(item.price)}
						>
							<View className="items-center border-b border-b-neutral-500 pb-1">
								<Text className="text-xs mb-2 mt-1" style={{ color: 'orange' }}>
									Crystal {item.crystal}
								</Text>
								<Image
									source={require('../../../../../../assets/img/crystals.png')}
									className="w-6 h-6"
								/>
								<Text style={{ color: 'orange' }}>{item.crystal}</Text>
							</View>
							<View className="items-center pb-4 pt-1">
								<Text style={{ color: 'orange' }}>{item.price}</Text>
							</View>
						</Pressable>
					</View>
				);
			})}
		</View>
	);
};
