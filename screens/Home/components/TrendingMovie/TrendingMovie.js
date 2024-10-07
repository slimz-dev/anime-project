import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, ImageBackground, FlatList, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { getTrendingMovie } from '../../../../services/Movie/getMostTrendingMovie';
import { useNavigation } from '@react-navigation/native';
import { screenStackName } from '../../../../config';
const movie = [];
export default TrendingMovie = () => {
	const st = styles;
	const navigation = useNavigation();
	const [movie, setMovie] = useState({});
	useEffect(() => {
		const fetchMovie = async () => {
			const result = await getTrendingMovie();
			setMovie(result.data);
		};
		fetchMovie();
	}, []);

	const handlePickMovie = () => {
		navigation.navigate(screenStackName.Movie, { movieID: movie._id });
	};
	return (
		<View className="bg-black">
			<View style={st.imageContainer}>
				{movie.picture && (
					<ImageBackground resizeMode="cover" src={movie.picture} style={[st.image]} />
				)}
				<View>
					<LinearGradient
						colors={['rgba(0,0,0,0.4)', 'rgba(6,6,6,0.55)', 'rgba(0,0,0,0.4)']}
						start={[0, 0]}
						end={[1, 1]}
						location={[0, 0.3, 1]}
						style={st.imageInfo}
					>
						<View style={{ marginBottom: 10 }}>
							<Text style={{ color: 'orange', fontWeight: 'bold' }}>
								{movie.movieName}
							</Text>
						</View>

						<View style={st.movieTypes}>
							<FlatList
								data={movie.categories}
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								columnWrapperStyle={{ flexWrap: 'wrap' }}
								numColumns={4}
								renderItem={({ item, index }) =>
									index > 0 ? (
										<View
											key={item.key}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<Entypo name="dot-single" size={10} color="gray" />
											<Text style={{ fontSize: 10, color: 'white' }}>
												{item.categoryName}
											</Text>
										</View>
									) : (
										<View key={item.key} style={{}}>
											<Text style={{ fontSize: 10, color: 'white' }}>
												{item.categoryName}
											</Text>
										</View>
									)
								}
							/>
						</View>

						<View style={st.buttonContainer}>
							<TouchableOpacity activeOpacity={0.8} onPress={handlePickMovie}>
								<View style={[st.imageButton, { backgroundColor: 'black' }]}>
									<AntDesign name="caretright" size={13} color="orange" />
									<Text style={{ marginLeft: 6, fontSize: 12, color: 'orange' }}>
										Play
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.8}>
								<View style={[st.imageButton, { backgroundColor: 'white' }]}>
									<AntDesign name="plus" size={13} color="black" />
									<Text
										style={{
											color: 'black',
											marginLeft: 6,
											fontWeight: 'bold',
											fontSize: 12,
										}}
									>
										My List
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</View>
		</View>
	);
};
