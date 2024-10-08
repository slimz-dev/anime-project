import { useContext, useState } from 'react';
import { Image, Text, View, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';

export default AccountModal = ({ isShow, setIsShowModal }) => {
	const { user } = useContext(AuthContext);
	const [showCalendar, setShowCalendar] = useState(false);
	const [date, setDate] = useState(user.myInfo.dob);
	const [image, setImage] = useState('');
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	console.log(date);
	return (
		<Modal
			isVisible={isShow}
			animationIn="fadeIn"
			animationInTiming={600}
			transparent
			className="-m-1   border  border-transparent overflow-hidden relative"
		>
			{showCalendar ? (
				<DateTimePicker
					value={new Date(0)}
					onChange={(evt, selectedDate) => {
						setDate(() => {
							setShowCalendar(false);
							const day = selectedDate.getDate();
							const month = selectedDate.getMonth() + 1;
							const year = selectedDate.getFullYear();
							return `${day}-${month}-${year}`;
						});
					}}
				/>
			) : (
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						paddingTop: 10,
					}}
				>
					<View className="justify-between items-center">
						<TouchableOpacity onPress={pickImage} className="bg-white p-3 rounded-3xl">
							<Text>Choose your image</Text>
						</TouchableOpacity>
						{image && (
							<Image
								source={{ uri: image }}
								className="w-28 h-28 rounded-full mt-2"
							/>
						)}
					</View>
					<View className=" flex-1 px-2 justify-center">
						<Text className="text-white ml-2 italic mt-2 mb-1">Name</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.name}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Username</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.username}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Phone number</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={
								user.myInfo.phone ? user.myInfo.phone : 'Type your phone number'
							}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Email</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.email ? user.myInfo.email : 'Type your email'}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Date of birth</Text>
						<Pressable onPress={() => setShowCalendar(true)}>
							<Text className="bg-orange-600 w-full p-2 border rounded-2xl text-gray-700">
								{date ? date : 'Choose your date of birth'}
							</Text>
						</Pressable>
					</View>
					<Pressable
						className="active:opacity-70 w-24 ml-36 mb-7"
						onPress={() => setIsShowModal(false)}
					>
						<View className="  bg-white p-4 rounded-full justify-center items-center">
							<Text className="text-black">Saved</Text>
						</View>
					</Pressable>
				</View>
			)}
		</Modal>
	);
};
