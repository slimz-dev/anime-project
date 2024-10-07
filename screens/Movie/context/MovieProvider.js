import { createContext, useState } from 'react';

export const MovieContext = createContext();

export default function MovieProvider({ children, data }) {
	const [src, setSrc] = useState('');
	const [isPlayed, setIsPlayed] = useState(false);
	const value = {
		movieSrc: src,
		setSrc,
		isPlayed,
		setIsPlayed,
		movie: data.movie,
		episodes: data.episodes,
		movieID: data.movieID,
	};
	return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
