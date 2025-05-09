import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer, { VideoRef } from 'react-native-video';
import { BackHandler } from 'react-native';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { WebView } from 'react-native-webview';
import { updateWatchedMovie } from '../../services/User/updateWatchedMovie';
export const Video = ({ route }) => {
	const { episode, startPosition } = route.params;
	const { user } = useContext(AuthContext);
	const navigation = useNavigation();
	const VideoRef = useRef(null);
	let watchTime = 0;
	let currentTime = 0;
	let getWatchTime;
	useEffect(() => {
		const backAction = async () => {
			if (currentTime >= 1 && watchTime >= 1) {
				const result = await updateWatchedMovie(user.myInfo._id, {
					watchTime,
					currentTime,
					episodeID: episode._id,
					movieID: episode.movie,
				});
				if (result.statusCode === 200) {
					socket.emit('fetch-user', user.myInfo._id);
					watchTime = 0;
					currentTime = 0;
				}
			}
			navigation
				.getParent()
				?.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: 'black' } });
			navigation.goBack();
		};
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
		getWatchTime = setInterval(() => {
			watchTime += 1;
		}, 1000);

		navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
		return () => {
			backHandler.remove();
			clearInterval(getWatchTime);
		};
	}, []);
	const handlePauseVid = (vid) => {
		if (vid.playbackRate === 0) {
			clearInterval(getWatchTime);
			const sendHistory = async () => {
				const result = await updateWatchedMovie(user.myInfo._id, {
					watchTime,
					currentTime,
					episodeID: episode._id,
					movieID: episode.movie,
				});
				if (result.statusCode === 200) {
					socket.emit('fetch-user', user.myInfo._id);
					watchTime = 0;
					currentTime = 0;
				}
			};
			if (currentTime >= 1 && watchTime >= 1) {
				sendHistory();
			}
		} else {
			getWatchTime = setInterval(() => {
				watchTime += 1;
			}, 1000);
		}
	};
	const handleProgress = (progress) => {
		currentTime = progress.currentTime * 1000;
		console.log(currentTime);
	};
	return (
		// <VideoPlayer
		// 	ref={VideoRef}
		// 	seek={100}
		// 	className="flex w-full h-full bg-black"
		// 	source={{ uri: episode.link, startPosition }}
		// 	resizeMode="contain" // Video will scale to maintain its aspect ratio
		// 	repeat={true} // Loop the video
		// 	controls={true}
		// 	onProgress={handleProgress}
		// 	onPlaybackRateChange={handlePauseVid}
		// />
		<WebView
			source={{
				uri: `https://d066-118-71-204-229.ngrok-free.app/video-player.html?src=${episode.link}`,
			}}
			style={{ flex: 1 }}
		/>
	);
};
