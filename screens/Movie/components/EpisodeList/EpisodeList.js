import { View, FlatList, Image, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
export default EpisodeList = ({ list, poster, isDisplay }) => {
	return (
		<View style={{ display: isDisplay ? 'flex' : 'none' }} className="mt-2">
			<FlatList
				// scrollEnabled={false}
				data={list}
				inverted
				renderItem={({ item, index }) => {
					return (
						<View className="flex-row mb-3 items-center justify-between mx-3">
							<View className="flex-row items-center">
								<Image src={poster} className="w-28 h-10 rounded-sm" />
								<Text className="text-white ml-3 font-bold text-xs">{`${
									list.length - index
								}. Episode ${item.episode}`}</Text>
							</View>
							<View
								className="rounded-full border p-1"
								style={{ borderColor: '#333' }}
							>
								<Entypo name="controller-play" size={16} color="white" />
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
};
