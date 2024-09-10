import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Text, View, ScrollView, Pressable, FlatList } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import EpisodeList from './components/EpisodeList/EpisodeList';
import { movie, episode, comments } from './mockData';
import MovieButton from './components/MovieButton/MovieButton';
import { useState } from 'react';
import CommentList from './components/CommentList/CommentList';
export default Movie = () => {
	const src = require('../../assets/logo.png');
	const translateX = useSharedValue(0);
	const [tab, setTab] = useState(0);
	const ListButtonWidth = 96;
	const handlePress = (index) => {
		translateX.value = withSpring(ListButtonWidth * index);
		setTab(index);
	};

	return (
		<FlatList
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
						<Text className="text-white font-bold text-2xl my-1">{movie.name}</Text>
						<View className="flex-row items-center">
							<View className="flex-row mr-2 items-center">
								<Text className="text-white opacity-80 text-xs mr-1 ">
									{movie.otherInfo.released}
								</Text>
								<FontAwesome
									name="calendar"
									size={12}
									color="white"
									style={{ opacity: 0.8 }}
								/>
							</View>
							<Text className="text-white opacity-60 text-xs">{`${movie.otherInfo.total} episodes`}</Text>
							<View className="flex-row ml-2 items-center">
								<AntDesign name="staro" size={14} color="orange" />
								<Text className="text-white text-sm opacity-90 ml-1">{`${movie.rating.star}`}</Text>
								<Text className="text-white text-xs opacity-80  mr-1">/5</Text>
								<Text className="text-white " style={{ fontSize: 8 }}>
									{`(${movie.rating.total} lượt)`}
								</Text>
							</View>
						</View>
						<View className="bg-white justify-center items-center flex-row py-2 border rounded-sm my-2">
							<FontAwesome name="play" size={24} color="black" />
							<Text className="ml-3 text-sm font-bold">Play</Text>
						</View>
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
							list={movie.episodes}
							poster={movie.poster}
							isDisplay={tab === 0}
						/>
						<CommentList isDisplay={tab === 1} list={comments} />
					</View>
				</View>
			}
		/>
	);
};
