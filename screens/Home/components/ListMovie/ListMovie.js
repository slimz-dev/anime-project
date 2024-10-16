import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, ImageBackground, Pressable } from 'react-native';
import { screenStackName } from '../../../../config';
import styles from '../../styles';
export default ListMovie = ({ data, header, isHistory }) => {
	const st = styles;
	const navigation = useNavigation();
	const transform = (title) => {
		return title.charAt(0).toUpperCase() + title.slice(1);
	};
	return (
		<View style={{ marginTop: 20 }}>
			<Text
				style={{
					color: 'orange',
					fontWeight: 'bold',
					marginBottom: 5,
				}}
			>
				{transform(header)}
			</Text>
			<FlatList
				data={data}
				horizontal
				renderItem={({ item }) => {
					return (
						<View
							key={item.key}
							style={{
								marginRight: 5,
								overflow: 'hidden',
								borderRadius: 2,
								position: 'relative',
							}}
						>
							<Pressable
								style={({ pressed }) => [
									{
										opacity: pressed ? 0.85 : 1,
									},
								]}
								onPress={() =>
									navigation.navigate(screenStackName.Movie, {
										movieID: isHistory ? item.watched.movie._id : item._id,
									})
								}
							>
								<ImageBackground
									src={!isHistory ? item.picture : item.watched.movie.picture}
									style={{
										width: 80,
										height: 100,
									}}
								/>
								<LinearGradient
									colors={[
										'rgba(0,0,0,0.6)',
										'rgba(6,6,6,0.55)',
										'rgba(0,0,0,0.9)',
									]}
									start={[0, 0]}
									end={[1, 1]}
									location={[0, 0.3, 1]}
									style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
								>
									<View
										style={{
											paddingVertical: 6,
											paddingLeft: 2,
										}}
									>
										<View style={{ marginBottom: 2 }}>
											<Text
												numberOfLines={1}
												style={{
													color: 'white',
													fontSize: 8,
													textTransform: 'capitalize',
												}}
											>
												{!isHistory
													? item.movieName
													: item.watched.movie.movieName}
											</Text>
										</View>
										<View>
											<Text
												numberOfLines={1}
												style={{
													color: '#8a9eaf',
													fontSize: 6,
													textTransform: 'capitalize',
												}}
											>
												{!isHistory
													? item.otherName
													: item.watched.movie.otherName}
											</Text>
										</View>
									</View>
								</LinearGradient>
							</Pressable>
						</View>
					);
				}}
			/>
		</View>
	);
};
