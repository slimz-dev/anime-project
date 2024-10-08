import { useContext, useState } from 'react';
import {
	Image,
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	Pressable,
	Button,
	TextInput,
} from 'react-native';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaskedView from '@react-native-masked-view/masked-view';
import { findBackground } from '../../constants/constans';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import AccountModal from './components/Modal/AccountModal';

export default AccountSetting = () => {
	const { user } = useContext(AuthContext);
	const [isShowModal, setIsShowModal] = useState(false);

	return (
		<>
			<View className="flex-1 bg-black ">
				<View className="border-b-neutral-700 pb-3  border-b">
					<View className="flex-row  px-3">
						<View className="relative w-28 h-28 rounded-full overflow-hidden ">
							<ImageBackground
								src="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/204639657_2944272719180797_5964371789766513767_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGCqxhWwx-wKsDafAvBEUBM6ExOhdXN5xjoTE6F1c3nGO50cP1a4YFM78U-MM-othgx_GXy4AUArYwOr99R5noa&_nc_ohc=sjSfKtYpbM0Q7kNvgGCm0YU&_nc_ht=scontent.fhan5-8.fna&_nc_gid=AUQ8EQra9oWzy6BF-wvoVJT&oh=00_AYCel6QNsfxWrfiGDn0TqMGa8SJDzqKYPbG936QSm1NzsQ&oe=670A1D4F"
								className="w-28 h-28"
							/>
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
					<View className="flex-row py-2">
						<Text className="text-white text-xl">Phone number: </Text>
						<Text className="text-white text-xl">01249129414</Text>
					</View>
					<View className="flex-row py-2">
						<Text className="text-white text-xl">Date of birth: </Text>
						<Text className="text-white text-xl">12/01/2002</Text>
					</View>
					<View className="flex-row py-2">
						<Text className="text-white text-xl">Username: </Text>
						<Text className="text-white text-xl">slimz</Text>
					</View>
					<View className="flex-row py-2">
						<Text className="text-white text-xl">Email: </Text>
						<Text className="text-white text-xl">hungpj11o2@gmail.com</Text>
					</View>
				</View>
			</View>
			<AccountModal isShow={isShowModal} setIsShowModal={setIsShowModal} />
		</>
	);
};
