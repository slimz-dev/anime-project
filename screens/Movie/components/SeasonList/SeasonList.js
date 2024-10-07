import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { screenStackName } from '../../../../config';
import { getSeason } from '../../../../services/Season/getMovie';
import Loading from '../../../LoadingScreen/Loading';
import { MovieContext } from '../../context/MovieProvider';
export default SeasonList = ({ isDisplay }) => {
	const navigation = useNavigation();
	const { movie, movieID } = useContext(MovieContext);
	const [season, setSeason] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchSeason = async () => {
			const result = await getSeason(movieID);
			if (result.statusCode === 200) {
				setSeason(result.data);
			}
			setIsLoading(false);
		};
		fetchSeason();
	}, []);
	const handleChooseSeason = (id) => {
		navigation.push(screenStackName.Movie, { movieID: id });
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				isDisplay && (
					<View className="mt-2">
						{season.list.map((item, index) => {
							return (
								<View
									key={index}
									className="flex justify-center border border-transparent rounded-xl"
									style={{
										backgroundColor:
											item.seasonName.localeCompare(movie.movieName) === 0
												? 'red'
												: 'transparent',
									}}
								>
									{item.seasonName.localeCompare(movie.movieName) !== 0 ? (
										<Pressable
											className="active:opacity-40 rounded-xl border border-transparent active:bg-stone-600 p-3"
											onPress={() => handleChooseSeason(item.link)}
										>
											<Text className="text-white">{item.seasonName}</Text>
										</Pressable>
									) : (
										<View className=" rounded-xl border border-transparent p-3">
											<Text className="text-white">{item.seasonName}</Text>
										</View>
									)}
								</View>
							);
						})}
					</View>
				)
			)}
		</>
	);
};
