import Modal from 'react-native-modal';
import { Image, Pressable, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

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
export const VipModal = ({ isShowModal, setIsShowModal }) => {
	const { user } = useContext(AuthContext);
	const [fontsLoaded, fontError] = useFonts({
		'Thu-Phap': require('../../../../assets/font/VNI-HLTHUPHAP.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<Modal isVisible={isShowModal} animationInTiming={600} transparent className=" relative">
			<View className="relative w-full h-4/6  bg-neutral-900 rounded-lg ">
				<View className="absolute -top-5 left-4">
					<Text style={{ fontFamily: 'Thu-Phap', color: 'orange' }} className="text-3xl ">
						VIP
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
					<View className=" p-2    mt-1 ">
						<View>
							<View className="flex-row items-center">
								<Image
									source={require('../../../../assets/img/vip.png')}
									className="w-32 h-32"
								/>
								<View className="flex-1">
									<Text style={{ color: 'orange', fontWeight: 'bold' }}>
										V.I.P
									</Text>
									<Text className="text-xs" style={{ color: 'orange' }}>
										Give you 3 days of VIP accessible
									</Text>
								</View>
							</View>
							<View className="flex-row justify-center my-2">
								<Text className="text-xs" style={{ color: 'orange' }}>
									Buy now for higher experience
								</Text>
							</View>
						</View>
						<View className="bg-black p-2 pb-4">
							<LinearGradient
								colors={['rgba(12,12,13,0.6)', 'rgba(249,151,0,1)']}
								start={{ x: 1, y: 0.4 }} // approximates 263 degrees
								end={{ x: 0.5, y: 0.8 }}
								locations={[0.4, 1]}
								className=" self-start pl-1 pr-10"
							>
								<Text className="text-xs">VIP accessible</Text>
							</LinearGradient>
							<View className="px-1">
								<Text className="text-xs pt-1" style={{ color: 'orange' }}>
									1. Receive VIP badge
								</Text>
								<Text className="text-xs pt-1" style={{ color: 'orange' }}>
									2. Access 1080p quality
								</Text>
							</View>
						</View>
						<View className="items-center">
							<View className="flex-row w-full justify-around my-2">
								<View className="justify-center ">
									<LinearGradient
										colors={[
											'rgba(12,12,13,0.6)',
											'rgba(249,151,0,1)',
											'rgba(12,12,13,0.6)',
										]}
										start={{ x: 0, y: 0 }} // approximates 263 degrees
										end={{ x: 1, y: 1 }}
										locations={[0, 0.5, 1]}
										className="px-6"
									>
										<Text
											className="text-xs font-bold"
											style={{ color: 'black' }}
										>
											Received
										</Text>
									</LinearGradient>
								</View>
								<Pressable className="active:opacity-70">
									<View
										className="px-4 py-1 rounded-md border border-zinc-700"
										style={{ backgroundColor: 'orange' }}
									>
										<Text className="text-xs">Extend</Text>
									</View>
								</Pressable>
							</View>
							<View className="mt-1 justify-center items-center">
								<LinearGradient
									colors={[
										'rgba(12,12,13,0.6)',
										'rgba(249,151,0,1)',
										'rgba(12,12,13,0.6)',
									]}
									start={{ x: 0, y: 0 }} // approximates 263 degrees
									end={{ x: 1, y: 1 }}
									locations={[0, 0.5, 1]}
									className="px-6"
								>
									<Text className="text-xs font-bold" style={{ color: 'black' }}>
										Expire in 9 days
									</Text>
								</LinearGradient>
							</View>
							{/* <Pressable className="active:opacity-70 mt-3">
								<View
									className="px-4 py-1 rounded-md border border-zinc-700 self-start flex-row"
									style={{ backgroundColor: 'orange' }}
								>
									<Text className="text-xs">Buy now</Text>
								</View>
							</Pressable> */}
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};
