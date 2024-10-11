import { useContext, useState } from 'react';
import { Image, Text, View, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import Feather from '@expo/vector-icons/Feather';
import ToastManager, { Toast } from 'toastify-react-native';
import { changeInfo } from '../../../../services/User/changeUserInfo';
export default AccountModal = ({ isShow, setIsShowModal }) => {
	const { user } = useContext(AuthContext);
	const [data, setData] = useState({
		avatar: undefined,
		name: undefined,
		quote: undefined,
		phone: undefined,
		mail: undefined,
		dob: undefined,
	});
	const [showCalendar, setShowCalendar] = useState(false);
	const [date, setDate] = useState(user.myInfo.dob);

	const getMimeType = (uri) => {
		// Extract the file extension from the URI
		const extension = uri.split('.').pop().toLowerCase(); // Get the file extension and convert to lowercase
		switch (extension) {
			case 'jpg':
			case 'jpeg':
			case 'jfif':
				return 'image/jpeg';
			case 'png':
				return 'image/png';
			case 'gif':
				return 'image/gif';
			case 'bmp':
				return 'image/bmp';
			case 'webp':
				return 'image/webp';
			case 'svg':
				return 'image/svg+xml';
			case 'tiff':
			case 'tif':
				return 'image/tiff';
			case 'ico':
				return 'image/x-icon';
			case 'heif':
				return 'image/heif';
			case 'heic':
				return 'image/heic';
			default:
				return 'application/octet-stream'; // Fallback for unknown file types
		}
	};
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setData((prev) => ({ ...prev, avatar: result.assets[0].uri }));
		}
	};
	const handleSaveChanged = async () => {
		if (data.avatar || data.name || data.quote || data.mail || data.dob || data.phone) {
			const form = new FormData();
			if (data.avatar) {
				form.append('avatar', {
					uri: data.avatar,
					type: getMimeType(data.avatar),
					name: 'avatar',
				});
			}
			if (data.name) {
				form.append('name', data.name);
			}
			if (data.quote) {
				form.append('quote', data.quote);
			}
			if (data.mail) {
				form.append('mail', data.mail);
			}
			if (data.dob) {
				form.append('dob', data.dob.toISOString());
			}
			if (data.phone) {
				form.append('phone', data.phone);
			}
			result = await changeInfo(user.myInfo._id, form);
		} else {
			Toast.warn('You havent changed anything yet');
		}
	};

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
						setData((prev) => {
							setShowCalendar(false);
							return {
								...prev,
								dob: selectedDate,
							};
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
						<Image
							source={{ uri: data.avatar ? data.avatar : user.myInfo.avatar }}
							className="w-28 h-28 rounded-full mt-2"
						/>
					</View>
					<View className=" flex-1 px-2 justify-center">
						<Text className="text-white ml-2 italic mt-2 mb-1">Name</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.name}
							value={data.name}
							onChangeText={(text) => setData((prev) => ({ ...prev, name: text }))}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Quote</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.quote ? user.myInfo.quote : 'Type your quote'}
							value={data.quote}
							onChangeText={(text) => setData((prev) => ({ ...prev, quote: text }))}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Phone number</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={
								user.myInfo.phone ? user.myInfo.phone : 'Type your phone number'
							}
							value={data.phone}
							onChangeText={(text) => setData((prev) => ({ ...prev, phone: text }))}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Email</Text>
						<TextInput
							className="bg-orange-600 w-full p-2 border rounded-2xl"
							placeholder={user.myInfo.email ? user.myInfo.email : 'Type your email'}
							value={data.mail}
							onChangeText={(text) => setData((prev) => ({ ...prev, mail: text }))}
						/>
						<Text className="text-white ml-2 italic mt-2 mb-1">Date of birth</Text>
						<Pressable onPress={() => setShowCalendar(true)}>
							<Text className="bg-orange-600 w-full p-2 border rounded-2xl text-gray-700">
								{data.dob
									? showDate(data.dob)
									: user.myInfo.dob
									? showDate(user.myInfo.dob)
									: 'Choose your date of birth'}
							</Text>
						</Pressable>
					</View>
					<View className="flex-row justify-center">
						<Pressable
							className="active:opacity-70 w-20 mr-10 mb-7"
							onPress={() => handleSaveChanged()}
						>
							<View className="  bg-white p-4  h-14 rounded-full justify-center items-center">
								<Text className="text-black">Save</Text>
							</View>
						</Pressable>
						<Pressable
							className="active:opacity-70 w-20  mb-7"
							onPress={() => setIsShowModal(false)}
						>
							<View className="  bg-white p-4  h-14 rounded-full justify-center items-center">
								<Text className="text-black">Cancel</Text>
							</View>
						</Pressable>
					</View>
				</View>
			)}
			<ToastManager
				animationIn="fadeInDown"
				animationOut="bounceOutRight"
				// showProgressBar={false}
				animationInTiming={300}
				animationOutTiming={500}
				duration={2000}
				showCloseIcon={false}
				style={{
					backgroundColor: 'black',
				}}
				textStyle={{
					color: 'orange',
					fontSize: 12,
				}}
			/>
		</Modal>
	);
};
