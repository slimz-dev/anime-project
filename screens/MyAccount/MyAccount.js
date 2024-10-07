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
import { data } from './mockData';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
const levelBackground = [
	{
		level: 2,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/hon_dau_la_052024.gif',
	},
	{
		level: 3,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/do_kiep_ky_2024.gif',
	},
	{
		level: 4,
		background:
			'https://hoathinh3d.run/wp-content/themes/halimmovies-child/assets/image/gif/dau_tong.gif',
	},
	{
		level: 5,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/vu_tru_ton_gia.gif',
	},
	{
		level: 6,
		background:
			'https://hoathinh3d.vin/wp-content/themes/halimmovies-child/assets/image/gif/hon_thanh_v2.gif',
	},
	{
		level: 7,
		background:
			'https://hoathinh3d.vin/wp-content/themes/halimmovies-child/assets/image/gif/dau_thanh_2024.gif',
	},
	{
		level: 8,
		background:
			'https://hoathinh3d.run/wp-content/themes/halimmovies-child/assets/image/gif/thanh_te_27.gif',
	},
	{
		level: 9,
		background:
			'https://hoathinh3d.vin/wp-content/themes/halimmovies-child/assets/image/gif/bat_hu.gif',
	},
];
export default MyAccount = () => {
	const { user } = useContext(AuthContext);
	const item = {
		name: 'kim dan',
		level: {
			index: 3,
		},
	};
	function findBackground(level) {
		const find = levelBackground.find((bg) => bg.level === level);
		if (find) {
			return find.background;
		}
		return '';
	}
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
									{/* findBackground(user.myInfo.level.index) */}
									<View className="mt-2 ">
										<ImageBackground
											src="https://hoathinh3d.vin/wp-content/themes/halimmovies-child/assets/image/gif/bat_hu.gif"
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
										source={require('../../assets/crystals.png')}
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
						<View className="mb-4">
							{user.myInfo.movieFollowed.length !== 0 && (
								<ListMovie data={user.myInfo.movieFollowed} header="My list" />
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
