import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { screenStackName } from '../../../../config';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import OutsidePressHandler from 'react-native-outside-press';
import Modal from 'react-native-modal';
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
export default MyAccountHeader = (data) => {
	const [isShowModal, setIsShowModal] = useState(false);
	const navigation = useNavigation();
	return (
		<>
			<View
				className="flex-1 h-14 bg-black justify-center"
				style={{ marginLeft: -16, marginRight: 16 }}
			>
				<View className="flex-row justify-between  items-center px-2">
					<Text style={{ color: 'orange' }} className=" text-xl ">
						{screenStackName.MyAccount}
					</Text>
					<View className="flex-row">
						<Pressable className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center">
							<Entypo name="magnifying-glass" size={20} color="white" />
						</Pressable>
						<Pressable
							className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center ml-2"
							onPress={() => setIsShowModal(true)}
						>
							<Octicons name="three-bars" size={20} color="white" />
						</Pressable>
					</View>
				</View>
			</View>
			<Modal
				isVisible={isShowModal}
				animationInTiming={600}
				transparent
				className="-m-1   border  border-transparent overflow-hidden"
				style={{
					borderTopLeftRadius: 35,
					borderTopRightRadius: 35,
					top: '56%',
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: '#333',
						paddingTop: 10,
					}}
				>
					<OutsidePressHandler
						onOutsidePress={() => {
							setIsShowModal(false);
						}}
					>
						<View className="justify-center ">
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
									>
										<View className="flex-row p-4 items-center">
											{Icon && <Icon size={24} color="white" />}
											<Text className="text-white ml-3 font-bold text-sm">
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
							>
								<View className="flex-row p-4 items-center">
									<MaterialIcons name="logout" size={24} color="white" />
									<Text className="text-white ml-3 font-bold text-sm">
										Sign out
									</Text>
								</View>
							</Pressable>
						</View>
					</OutsidePressHandler>
				</View>
			</Modal>
		</>
	);
};
