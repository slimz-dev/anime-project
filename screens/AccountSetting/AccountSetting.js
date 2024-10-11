import { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaskedView from '@react-native-masked-view/masked-view';
import { findBackground } from '../../constants/constans';
import AntDesign from '@expo/vector-icons/AntDesign';
import AccountModal from './components/Modal/AccountModal';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useFonts } from 'expo-font';
import ToastManager from 'toastify-react-native';

export default AccountSetting = () => {
	const { user } = useContext(AuthContext);
	const [isShowModal, setIsShowModal] = useState(false);
	const [fontsLoaded, fontError] = useFonts({
		'Thu-Phap': require('../../assets/font/VNI-HLTHUPHAP.ttf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
	const showDate = (date) => {
		if (typeof date !== 'Date') {
			date = new Date(date);
		}
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};
	return (
		<>
			<View className="flex-1 bg-black ">
				<View className="border-b-neutral-700 pb-3  border-b">
					<View className="flex-row  px-3">
						<View className="relative w-28 h-28 rounded-full overflow-hidden ">
							<ImageBackground src={user.myInfo.avatar} className="w-28 h-28" />
						</View>
						<View className=" flex-1 justify-center ml-3 mt-10">
							<Text className="text-orange-500 mb-1 text-base">
								{user.myInfo.name}
							</Text>
							<View className="flex-1">
								<MaskedView
									style={{ flex: 1 }}
									maskElement={
										<Text className="text-xl font-bold mr-3 ">
											{user.myInfo.level.name}
										</Text>
									}
								>
									<ImageBackground
										source={findBackground(user.myInfo.level.index)}
										style={{ flex: 1, backgroundColor: '#898989' }}
									/>
								</MaskedView>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.6}
							className="justify-center"
							onPress={() => setIsShowModal(true)}
						>
							<View>
								<FontAwesome name="pencil" size={24} color="white" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View className="px-3">
					<View className="mb-2 mt-4">
						<View className=" w-full h-6  border border-orange-400 rounded-lg overflow-hidden relative">
							<View className="bg-orange-600 w-1/4 h-full "></View>
							<Text className="text-white absolute left-1/2 top-0.5">75%</Text>
						</View>
						<View className="justify-center items-center mt-1">
							<Text className="text-white">You have reached maximum level</Text>
						</View>
					</View>
					<View className="flex-row my-3 justify-center items-center">
						<View className="mb-6">
							<Fontisto name="quote-a-right" size={12} color="white" />
						</View>
						<View className=" mx-2 ">
							<Text
								className="text-lg"
								style={{ color: 'red', fontFamily: 'Thu-Phap' }}
							>
								{user.myInfo.quote}
							</Text>
						</View>
						<View className="mt-6">
							<Fontisto name="quote-a-left" size={12} color="white" />
						</View>
					</View>
					{[
						{
							title: 'Phone number',
							value: user.myInfo.phone,
							icon: <Entypo name="old-phone" size={14} color="orange" />,
						},
						{
							title: 'Date of birth',
							value: showDate(user.myInfo.dob),
							icon: <FontAwesome name="birthday-cake" size={14} color="orange" />,
						},
						{
							title: 'Username',
							value: user.myInfo.username,
							icon: <Entypo name="user" size={14} color="orange" />,
						},
						{
							title: 'Email',
							value: user.myInfo.mail,
							icon: <AntDesign name="mail" size={14} color="orange" />,
						},
					].map(({ title, value, icon }) => {
						return (
							<View
								key={title}
								className="flex-row py-5 items-center border-b border-b-zinc-700"
							>
								{icon}
								<Text className=" text-sm ml-2 italic font-bold text-orange-400 mr-1">
									{`${title}:`}
								</Text>
								<Text className=" text-xs italic font-bold text-green-300">
									{value}
								</Text>
							</View>
						);
					})}
				</View>
			</View>
			<AccountModal isShow={isShowModal} setIsShowModal={setIsShowModal} />
		</>
	);
};
