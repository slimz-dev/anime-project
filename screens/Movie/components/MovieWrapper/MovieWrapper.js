import { useEffect, useState } from 'react';
import { getEpisodes } from '../../../../services/Episode/getEpisodes';
import { getMovie } from '../../../../services/Movie/getMovie';
import socket from '../../../../utils/socket';
import Loading from '../../../LoadingScreen/Loading';
import MovieProvider from '../../context/MovieProvider';
import Movie from '../../Movie';

export default MovieWrapper = ({ route }) => {
	const { movieID } = route.params;
	const [movie, setMovie] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		socket.emit('joinMovieRoom', movieID);
		const getCurrentMovie = async () => {
			const result = await getMovie(movieID);
			if (result.statusCode === 200) {
				setMovie(result.data);
				const fetchEpisodes = await getEpisodes(movieID);
				if (fetchEpisodes.statusCode === 200) {
					setEpisodes(fetchEpisodes.data);
				}
			}
			setIsLoading(() => {
				return false;
			});
		};
		getCurrentMovie();
		return () => {
			socket.emit('leaveMovie', movieID);
		};
	}, []);
	const data = {
		movie,
		episodes: episodes,
		movieID,
	};
	return <MovieProvider data={data}>{isLoading ? <Loading /> : <Movie />}</MovieProvider>;
};
