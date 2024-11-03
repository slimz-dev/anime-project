import Modal from 'react-native-modal';
import { Image, Pressable, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import { useFonts } from 'expo-font';
import { RowBalance } from './components/RowBalance/RowBalance';

const firstRow = [
	{ crystal: 6, price: '25.000Đ' },
	{ crystal: 30, price: '129.000Đ' },
	{ crystal: 68, price: '249.000Đ' },
];

const secondRow = [
	{ crystal: 98, price: '379.000Đ' },
	{ crystal: 198, price: '779.000Đ' },
	{ crystal: 328, price: '1.299.000Đ' },
];
const thirdRow = [
	{ crystal: 648, price: '2.499.000Đ' },
	{ crystal: 1998, price: '7.999.000Đ' },
	{ crystal: 6248, price: '21.999.000Đ' },
];
export const PaymentModal = ({ isShowModal, setIsShowModal }) => {
	const { user } = useContext(AuthContext);
	const [fontsLoaded, fontError] = useFonts({
		'Thu-Phap': require('../../../../assets/font/VNI-HLTHUPHAP.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<Modal isVisible={isShowModal} animationInTiming={600} transparent className=" relative">
			<View className="relative w-full h-5/6  bg-neutral-900 rounded-lg ">
				<View className="absolute -top-5 left-4">
					<Text style={{ fontFamily: 'Thu-Phap', color: 'orange' }} className="text-3xl ">
						Crystal
					</Text>
				</View>
				<View className="bg-neutral-900 border border-neutral-600 flex-shrink self-start py-1 rounded-full flex-row absolute -top-7 right-20">
					<Image
						source={require('../../../../assets/img/crystals.png')}
						className="w-4 h-4 ml-1"
					/>
					<Text className="px-3 text-xs text-orange-600">{user.myInfo.balance}</Text>
				</View>
				<Pressable
					onPress={() => setIsShowModal(false)}
					className="absolute -top-4 -right-4"
				>
					<Image
						src="https://static.vecteezy.com/system/resources/thumbnails/011/458/959/small_2x/letter-x-alphabet-in-brush-style-png.png"
						className="w-10 h-10"
					/>
				</Pressable>
				<View className="mt-6 px-2">
					<View className="self-end">
						<Text className="text-orange-500">Support us by purchase ^^</Text>
					</View>
					<View className=" p-2 border  border-neutral-700  mt-1 ">
						<RowBalance data={firstRow} />
						<RowBalance data={secondRow} />
						<RowBalance data={thirdRow} />
					</View>
					<View className="mt-1">
						<Text className="text-xs" style={{ color: 'orange' }}>
							Crystal can use for VIP purchase and more activities in the future..
						</Text>
					</View>
				</View>
			</View>
		</Modal>
	);
};
