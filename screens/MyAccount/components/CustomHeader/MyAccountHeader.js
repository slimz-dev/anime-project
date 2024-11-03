import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import { screenStackName } from '../../../../config';
import { useState } from 'react';
import { NavigateModal } from '../NavigateModal/NavigateModal';
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
						<Pressable
							className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
							onPress={() => navigation.navigate(screenStackName.Search)}
						>
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
			<NavigateModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
		</>
	);
};
