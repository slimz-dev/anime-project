import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { rateMovie } from '../../../../services/User/rateMovie';
import { useContext } from 'react';
import { MovieContext } from '../../context/MovieProvider';
import { Toast } from 'toastify-react-native';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
export default RateModal = ({ isShow, setIsShow }) => {
	const { user } = useContext(AuthContext);
	const { movieID } = useContext(MovieContext);
	const handleRate = async (stars) => {
		const result = await rateMovie(movieID, stars);
		socket.emit('fetch-user', user.myInfo._id);
		if (result.statusCode === 200) {
			Toast.success('You have rated successfully');
		} else if (result.statusCode === 403) {
			Toast.error("You've already rated this ");
		}
	};
	return (
		<Modal
			isVisible={isShow}
			animationIn="fadeIn"
			animationInTiming={600}
			transparent
			className="  border  border-transparent  relative items-center "
		>
			<View className="bg-stone-800 px-4 py-8 rounded-xl w-full ">
				<View className="items-center">
					<Text className="text-white">Tell us your feeling about this movie?</Text>
				</View>
				{[
					{
						icon: <FontAwesome5 name="sad-cry" size={20} color="orange" />,
						title: 'Terrible',
						stars: 1,
					},
					{
						icon: <FontAwesome5 name="grimace" size={20} color="orange" />,
						title: 'Alright',
						stars: 2,
					},
					{
						icon: <FontAwesome5 name="kiss-beam" size={20} color="orange" />,
						title: 'Chillin',
						stars: 3,
					},
					{
						icon: <FontAwesome5 name="laugh" size={20} color="orange" />,
						title: 'Enjoyable',
						stars: 4,
					},
					{
						icon: <FontAwesome5 name="laugh-squint" size={20} color="orange" />,
						title: 'Awesome',
						stars: 5,
					},
				].map(({ icon, title, stars }) => {
					return (
						<Pressable
							className="active:bg-white active:opacity-10 p-2  mt-3 rounded-md"
							onPress={() => handleRate(stars)}
							key={title}
						>
							<View className="flex-row items-center ">
								<View className="w-1/2 flex-row">
									{icon}
									<Text className="text-orange-500 font-bold ml-2">{title}</Text>
								</View>
								<View className="flex-row">
									{Array(5)
										.fill()
										.map((item, index) => {
											if (index + 1 <= stars) {
												return (
													<Entypo
														key={index}
														name="star"
														size={24}
														color="orange"
													/>
												);
											}
											return (
												<Entypo
													key={index}
													name="star"
													size={24}
													color="white"
												/>
											);
										})}
								</View>
							</View>
						</Pressable>
					);
				})}
			</View>
			<View className="bg-white w-10 h-10 rounded-full justify-center items-center absolute bottom-12">
				<Pressable onPress={() => setIsShow(false)}>
					<Feather name="x" size={20} color="black" />
				</Pressable>
			</View>
		</Modal>
	);
};
