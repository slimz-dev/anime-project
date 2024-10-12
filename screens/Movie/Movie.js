import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Text, View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import EpisodeList from './components/EpisodeList/EpisodeList';
import MovieButton from './components/MovieButton/MovieButton';
import { useContext, useEffect, useRef, useState } from 'react';
import CommentList from './components/CommentList/CommentList';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Video from 'react-native-video';
import { MovieContext } from './context/MovieProvider';
import SeasonList from './components/SeasonList/SeasonList';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import { screenStackName } from '../../config';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
export default Movie = () => {
	const { movie, episodes } = useContext(MovieContext);
	const { user } = useContext(AuthContext);
	const navigation = useNavigation();
	const src = require('../../assets/img/logo.png');
	const imdbSrc = require('../../assets/img/imdb.png');
	const translateX = useSharedValue(0);
	const [tab, setTab] = useState(0);
	const ListButtonWidth = 96;

	const handlePress = (index) => {
		translateX.value = withSpring(ListButtonWidth * index);
		setTab(index);
	};

	const handleContinue = (episode, startPosition) => {
		Dialog.hide();
		navigation.navigate(screenStackName.Video, { episode, startPosition });
	};
	const handlePlay = () => {
		if (episodes.length > 0) {
			const isExistedHistory = user.myInfo.movieWatched.find((mov) => {
				return mov.watched.movie === movie._id;
			});
			if (isExistedHistory) {
				let seconds = isExistedHistory.currentTime / 1000;
				console.log(seconds);
				let minutes = parseInt(seconds / 60);
				if (minutes <= 9) {
					minutes = `0${minutes}`;
				}
				seconds = parseInt(seconds - minutes * 60);
				if (seconds <= 9) {
					seconds = `0${seconds}`;
				}
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Warning',
					textBody: `You previously watched this movie at ${minutes}:${seconds} in episode ${isExistedHistory.watched.episodeName}, do you wish to continue?`,
					button: 'yes',
					onPressButton: () =>
						handleContinue(isExistedHistory.watched, isExistedHistory.currentTime),
				});
			} else {
				navigation.navigate(screenStackName.Video, {
					episode: episodes[episodes.length - 1],
				});
			}
		} else {
			Toast.error('No episode available');
		}
	};

	return (
		<>
			<FlatList
				style={{
					flex: 1,
					backgroundColor: 'black',
				}}
				ListHeaderComponent={
					<View className="bg-black flex-1 pb-1">
						<Image src={movie.poster} className="w-full h-48" />
						<View className="px-2 border-b-2 border-b-slate-900">
							<View className="flex-row items-center mt-1">
								<Image source={src} className="w-6 h-6 mr-1" />
								<Text className="text-slate-700 uppercase text-xs font-bold">
									S e r i e s
								</Text>
							</View>
							<Text className="text-white font-bold text-2xl my-1">
								{movie.movieName}
							</Text>
							<View className="flex-row items-center">
								<View className="flex-row items-center">
									<Text className="text-white opacity-80 text-xs mr-1 ">
										{movie.otherInfo.release}
									</Text>
									<FontAwesome
										name="calendar"
										size={12}
										color="white"
										style={{ opacity: 0.8 }}
									/>
								</View>
								{movie.otherInfo.total && (
									<Text className="text-white ml-2 opacity-60 text-xs">{`${movie.otherInfo.total} episodes`}</Text>
								)}
								{movie.otherInfo.timeEstimate && (
									<View className="flex-row ml-2 items-center">
										<Text className="text-white opacity-80 text-xs mr-1 ">
											{`${movie.otherInfo.timeEstimate} mins`}
										</Text>
										<AntDesign
											name="clockcircle"
											size={12}
											color="white"
											style={{
												opacity: 0.8,
											}}
										/>
									</View>
								)}
								<View className="flex-row ml-2 items-center">
									<AntDesign name="staro" size={14} color="orange" />
									<Text className="text-white text-sm opacity-90 ml-1">{`${
										movie.rating.totalUser !== 0
											? movie.rating.totalStar / movie.rating.totalUser
											: 0
									}`}</Text>
									<Text className="text-white text-xs opacity-80  mr-1">/5</Text>
									<Text className="text-white " style={{ fontSize: 8 }}>
										{`(${movie.rating.totalUser} lượt)`}
									</Text>
									{movie.otherInfo.imdb && (
										<View className="flex-row ml-2 items-center">
											<Text className="text-white opacity-80 text-xs mr-1 ">
												{movie.otherInfo.imdb}
											</Text>
											<Image source={imdbSrc} className="w-7 h-3" />
										</View>
									)}
								</View>
							</View>
							<TouchableOpacity activeOpacity={0.8} onPress={handlePlay}>
								<View className="bg-white justify-center items-center flex-row py-2 border rounded-sm my-2">
									<FontAwesome name="play" size={24} color="black" />
									<Text className="ml-3 text-sm font-bold">Play</Text>
								</View>
							</TouchableOpacity>
							<Text className="text-white text-justify text-xs opacity-90 z-20">
								{movie.description}
							</Text>
							<View className="my-3 flex-row justify-start px-8 ">
								<MovieButton
									text="My list"
									icon={<AntDesign name="plus" size={20} color="white" />}
								/>
								<MovieButton
									text="Rate"
									icon={<SimpleLineIcons name="like" size={20} color="white" />}
								/>
							</View>
						</View>
						<View>
							<View className="flex-row relative">
								{['Episodes', 'Comments', 'Seasons'].map((title, index) => {
									return (
										<Pressable
											onPress={() => handlePress(index)}
											key={index}
											style={({ pressed }) => [
												{
													backgroundColor: pressed
														? '#524D4D'
														: 'transparent',
												},
											]}
										>
											<View
												className=" py-2 text-center items-center justify-center"
												style={{ width: ListButtonWidth }}
											>
												<Text className="text-white">{title}</Text>
											</View>
										</Pressable>
									);
								})}
								<Animated.View
									className="absolute bg-red-600 h-1 w-24"
									style={{ transform: [{ translateX }] }}
								/>
							</View>
							<EpisodeList
								list={episodes}
								poster={movie.poster}
								isDisplay={tab === 0}
							/>
							<CommentList isDisplay={tab === 1} />
							<SeasonList isDisplay={tab === 2} />
						</View>
					</View>
				}
			/>
		</>
	);
};
