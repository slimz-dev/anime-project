import { View, FlatList, Image, Text, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Video, { VideoRef } from 'react-native-video';
import { useContext, useState } from 'react';
import { MovieContext } from '../../context/MovieProvider';
import { useNavigation } from '@react-navigation/native';
import { screenStackName } from '../../../../config';
export default EpisodeList = ({ list, poster, isDisplay }) => {
	const navigation = useNavigation();
	function handlePlayVideo(episode) {
		navigation.navigate(screenStackName.Video, { episode });
	}
	return (
		<View style={{ display: isDisplay ? 'flex' : 'none' }} className="mt-2">
			<FlatList
				// scrollEnabled={false}
				data={list}
				inverted
				renderItem={({ item, index }) => {
					return (
						<View className="flex-row mb-3 items-center justify-between ">
							<Pressable
								className=" active:opacity-75 items-center flex-1 flex-row justify-between  p-2 rounded-lg"
								onPress={() => handlePlayVideo(item)}
							>
								<View className="flex-row items-center">
									<Image src={poster} className="w-28 h-10 rounded-sm" />
									<Text className="text-white ml-3 font-bold text-xs">{`${
										list.length - index
									}. Episode ${item.episodeName}`}</Text>
								</View>
								<View
									className="rounded-full border p-1"
									style={{ borderColor: '#333' }}
								>
									<Entypo name="controller-play" size={16} color="white" />
								</View>
							</Pressable>
						</View>
					);
				}}
			/>
		</View>
	);
};
