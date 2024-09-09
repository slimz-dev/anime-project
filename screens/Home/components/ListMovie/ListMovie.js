import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, ImageBackground, Pressable } from 'react-native';
import { screenStackName } from '../../../../config';
import styles from '../../styles';
export default ListMovie = ({ data }) => {
	const st = styles;
	const navigation = useNavigation();
	return (
		<View style={{ marginTop: 20 }}>
			<Text
				style={{
					color: 'orange',
					fontWeight: 'bold',
					textTransform: 'capitalize',
					marginBottom: 5,
				}}
			>
				{data.releaseDay}
			</Text>
			<FlatList
				data={data.list}
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
								onPress={() => navigation.navigate(screenStackName.Movie)}
							>
								<ImageBackground
									src={item.src}
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
												{item.name}
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
												{item.engName}
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
