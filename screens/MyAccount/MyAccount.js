import {
	Image,
	ImageBackground,
	Text,
	View,
	TextInput,
	Pressable,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskedView from '@react-native-masked-view/masked-view';
import Entypo from '@expo/vector-icons/Entypo';
import ListMovie from '../Home/components/ListMovie/ListMovie';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { findBackground } from '../../constants/constans';
import { useNavigation } from '@react-navigation/native';
import { screenStackName } from '../../config';

export default MyAccount = () => {
	const navigation = useNavigation();
	const { user } = useContext(AuthContext);
	const item = {
		name: 'kim dan',
		level: {
			index: 3,
		},
	};

	return (
		<View className="bg-black flex-1">
			<FlatList
				ListHeaderComponent={
					<>
						<View className="relative">
							<ImageBackground
								src="https://i.pinimg.com/originals/4e/2a/c0/4e2ac066008948d93d9251cb88830fc3.jpg"
								resizeMode="cover"
							>
								<View className="items-center  p-1">
									<Image
										src={user.myInfo.avatar}
										className="w-16 h-16  rounded-full"
									/>

									<View className="ml-2 mt-2">
										<Text className="text-white text-xs italic text-center font-bold mr-3 ">
											{user.myInfo.name}
										</Text>
									</View>
									<View className="mt-2 ">
										<ImageBackground
											source={findBackground(user.myInfo.level.index)}
											style={{
												backgroundColor: '#898989',
											}}
										>
											<Text
												className="text-white capitalize text-center font-black  w-10 rounded-full"
												numberOfLines={1}
												style={{ fontSize: 8 }}
											>
												{user.myInfo.level.name}
											</Text>
										</ImageBackground>
									</View>
								</View>
								<View className="mb-1 flex-row items-center absolute top-1 right-1">
									<Image
										source={require('../../assets/img/crystals.png')}
										className="w-3 h-3"
									/>
									<Text className="text-white font-bold text-xs ml-1">
										{user.myInfo.balance}
									</Text>
								</View>
							</ImageBackground>
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? '#333' : 'transparent',
									},
								]}
								onPress={() => navigation.navigate(screenStackName.Notification)}
							>
								<View className="flex-row justify-between items-center py-1 px-2">
									<View className="flex-row items-center">
										<View className="bg-red-600 p-2 rounded-full mr-2">
											<Ionicons
												name="notifications"
												size={18}
												color="white"
											/>
										</View>
										<Text className="text-white text-xs font-bold">
											Notifications
										</Text>
									</View>
									<Entypo name="chevron-thin-right" size={18} color="white" />
								</View>
							</Pressable>
						</View>
						<View className="mb-4 ml-1">
							{user.myInfo.movieFollowed.length !== 0 && (
								<ListMovie data={user.myInfo.movieFollowed} header="Your list" />
							)}

							{user.myInfo.movieRated.oneStar.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieRated.oneStar}
									header="Movies you strongly disliked"
								/>
							)}
							{user.myInfo.movieRated.twoStars.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieRated.twoStars}
									header="Movies you didn't like much"
								/>
							)}
							{user.myInfo.movieRated.threeStars.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieRated.threeStars}
									header="Movies that were just okay"
								/>
							)}
							{user.myInfo.movieRated.fourStars.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieRated.fourStars}
									header="Movies you really liked"
								/>
							)}
							{user.myInfo.movieRated.fiveStars.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieRated.fiveStars}
									header="Movies you loved"
								/>
							)}
							{user.myInfo.movieWatched.length !== 0 && (
								<ListMovie
									data={user.myInfo.movieWatched}
									isHistory={true}
									header="Movies you've watched"
								/>
							)}
						</View>
					</>
				}
			/>
		</View>
	);
};
