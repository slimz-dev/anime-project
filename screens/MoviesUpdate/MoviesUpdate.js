import { useEffect, useRef, useState } from 'react';
import { Text, View, FlatList, Image, Pressable } from 'react-native';
import { getRated } from '../../services/Movie/getTopRatedMovies';
import { getWatched } from '../../services/Movie/getTopWatchedMovies';
import { getUpcoming } from '../../services/Movie/getUpcomingMovies';
import Loading from '../LoadingScreen/Loading';
import MovieContainer from './components/MovieContainer/MovieContainer';

const view = [
	{
		icon: require('../../assets/img/popcorn.png'),
		name: 'Coming soon',
	},
	{
		icon: require('../../assets/img/fire.png'),
		name: "Everyone's watching",
	},
	{
		icon: require('../../assets/img/top10.png'),
		name: 'Top 10 Kmovie',
	},
];

export default MoviesUpdate = () => {
	const [active, setActive] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const movieRef = useRef();
	const [data, setData] = useState([]);
	function handleChangeTab(e, index) {
		movieRef.current.scrollToIndex({ index });
		setActive(index);
	}
	useEffect(() => {
		const getMovie = async () => {
			const upcomingMovie = await getUpcoming();
			const recommend = await getWatched();
			const top = await getRated();
			if (
				upcomingMovie.statusCode === 200 &&
				recommend.statusCode === 200 &&
				top.statusCode === 200
			) {
				setData(() => {
					return [
						{ data: upcomingMovie.data },
						{ data: recommend.data },
						{ data: top.data, top: true },
					];
				});
				setIsLoading(false);
			}
		};
		getMovie();
	}, []);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<View
					style={{
						backgroundColor: 'black',
						flex: 1,
						paddingHorizontal: 10,
						paddingVertical: 10,
					}}
				>
					<View style={{ marginBottom: 10 }}>
						<FlatList
							horizontal
							data={view}
							renderItem={({ item, index }) => {
								return (
									<Pressable onPress={(e) => handleChangeTab(e, index)}>
										<View
											key={item.key}
											style={{
												justifyContent: 'center',
												alignItems: 'center',
												borderWidth: 1,
												borderColor: 'white',
												flexDirection: 'row',
												backgroundColor:
													active !== index ? 'black' : 'white',
												paddingHorizontal: 8,
												paddingVertical: 2,
												borderRadius: 20,
												marginRight: 8,
												height: 30,
											}}
											onLayout={(e) => {
												const layout = e.nativeEvent.layout;
											}}
										>
											<Image
												style={{
													marginRight: 4,
													height: 14,
													width: 14,
												}}
												source={item.icon}
											/>

											<Text
												style={{
													color: active !== index ? 'white' : 'black',
												}}
												className="text-xs font-bold "
											>
												{item.name}
											</Text>
										</View>
									</Pressable>
								);
							}}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<FlatList
							ref={movieRef}
							data={data}
							renderItem={({ item }) => {
								return <MovieContainer data={item.data} top={item.top} />;
							}}
						/>
					</View>
				</View>
			)}
		</>
	);
};
