import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { screenStackName } from '../../../../config';
import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import OutsidePressHandler from 'react-native-outside-press';
import Modal from 'react-native-modal';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import { removeDevice } from '../../../../services/User/removeDevice';
import * as Linking from 'expo-linking';
import { PaymentModal } from '../PaymentModal/PaymentModal';
import { VipModal } from '../VipModal/VipModal';
const pjson = require('../../../../package.json');
const myAccountStackNavigator = [
	{
		name: 'Account',
		navigate: screenStackName.AccountSetting,
		icon: ({ size = '24', color = 'black' }) => (
			<AntDesign name="user" size={size} color={color} />
		),
	},
	{
		name: screenStackName.Ranking,
		navigate: screenStackName.Ranking,
		icon: ({ size = '24', color = 'black' }) => (
			<MaterialCommunityIcons name="progress-star" size={size} color={color} />
		),
	},
	{
		name: 'Help',
		navigate: screenStackName.HelpCenter,
		icon: ({ size = '24', color = 'black' }) => (
			<AntDesign name="questioncircleo" size={size} color={color} />
		),
	},
];

export const NavigateModal = ({ isShowModal, setIsShowModal }) => {
	const navigation = useNavigation();
	const [isShowPaymentModal, setIsShowPaymentModal] = useState(false);
	const [isShowVipModal, setIsShowVipModal] = useState(false);
	const { logout, user } = useContext(AuthContext);
	const handleSignOut = async () => {
		const result = await removeDevice(user.myInfo._id);
		if (result) {
			logout();
		}
	};
	return (
		<>
			<Modal
				isVisible={isShowModal}
				animationInTiming={600}
				animationOutTiming={1000}
				transparent
				className="-m-1   border  border-transparent overflow-hidden"
				style={{
					borderTopLeftRadius: 35,
					borderTopRightRadius: 35,
					top: '46%',
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: '#2a2d2a',
						paddingTop: 10,
					}}
				>
					<OutsidePressHandler
						onOutsidePress={() => {
							setIsShowModal(false);
						}}
					>
						<View className="justify-center ">
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? '#3a3b3c' : 'transparent',
									},
								]}
								onPress={() => setIsShowPaymentModal(true)}
							>
								<View className="flex-row p-3 items-center">
									<MaterialIcons name="attach-money" size={24} color="white" />
									<Text className="text-white ml-3 font-bold text-sm">
										Add Balance
									</Text>
								</View>
							</Pressable>
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? '#3a3b3c' : 'transparent',
									},
								]}
								onPress={() => setIsShowVipModal(true)}
							>
								<View className="flex-row p-3 items-center">
									<MaterialCommunityIcons name="omega" size={24} color="white" />
									<Text className="text-white ml-3 font-bold text-sm">V.I.P</Text>
								</View>
							</Pressable>
							{myAccountStackNavigator.map((navigator, index) => {
								const Icon = navigator.icon;
								return (
									<Pressable
										key={index}
										style={({ pressed }) => [
											{
												backgroundColor: pressed
													? '#3a3b3c'
													: 'transparent',
											},
										]}
										onPress={() => navigation.navigate(navigator.navigate)}
									>
										<View className="flex-row p-3 items-center">
											{Icon && <Icon size={24} color="white" />}
											<Text className="text-white ml-3 font-bold text-sm capitalize">
												{navigator.name}
											</Text>
										</View>
									</Pressable>
								);
							})}

							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? '#3a3b3c' : 'transparent',
									},
								]}
								onPress={handleSignOut}
							>
								<View className="flex-row p-3 items-center">
									<MaterialIcons name="logout" size={24} color="white" />
									<Text className="text-white ml-3 font-bold text-sm">
										Sign out
									</Text>
								</View>
							</Pressable>
						</View>
						<View>
							<Text
								className="text-white opacity-60 p-3"
								style={{ fontSize: 8 }}
							>{`Version: ${pjson.version} `}</Text>
						</View>
						{isShowPaymentModal && (
							<PaymentModal
								isShowModal={isShowPaymentModal}
								setIsShowModal={setIsShowPaymentModal}
							/>
						)}
						{isShowVipModal && (
							<VipModal
								isShowModal={isShowVipModal}
								setIsShowModal={setIsShowVipModal}
							/>
						)}
					</OutsidePressHandler>
				</View>
			</Modal>
		</>
	);
};
