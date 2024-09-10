import { View, FlatList, Image, Text } from 'react-native';

export default EpisodeList = ({ list, poster, isDisplay }) => {
	return (
		<View style={{ display: isDisplay ? 'flex' : 'none' }}>
			<FlatList
				// scrollEnabled={false}
				data={list}
				inverted
				renderItem={({ item, index }) => {
					return (
						<View className="flex-row mb-3 items-center">
							<Image src={poster} className="w-28 h-10 rounded-sm" />
							<Text className="text-white ml-3 font-bold text-xs">{`${
								list.length - index
							}. Episode ${item.episode}`}</Text>
						</View>
					);
				}}
			/>
		</View>
	);
};
