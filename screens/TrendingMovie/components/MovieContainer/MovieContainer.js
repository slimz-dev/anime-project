import { Text, View, FlatList } from 'react-native';
import MovieInfo from '../MovieInfo/MovieInfo';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default MovieContainer = ({ data, top = false }) => {
	return (
		<FlatList
			scrollEnabled={false}
			data={data}
			renderItem={({ item, index }) => {
				const monthReleased = item.releasedDate.getMonth();
				return (
					<View
						style={{
							flexDirection: 'row',
							marginBottom: 10,
						}}
					>
						{!item.isRelease ? (
							<View style={{ marginRight: 14 }}>
								<Text
									style={{
										color: 'white',
										opacity: 0.8,
										fontSize: 12,
										textTransform: 'uppercase',
									}}
								>
									{month[monthReleased]}
								</Text>
								<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
									{item.releasedDate.getDate()}
								</Text>
							</View>
						) : top ? (
							<View style={{ marginRight: 14 }}>
								<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
									{index + 1}
								</Text>
							</View>
						) : (
							<></>
						)}
						<MovieInfo data={item} />
					</View>
				);
			}}
		/>
	);
};
