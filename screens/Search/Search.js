import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchMovie } from '../../services/Movie/searchMovie';
import { screenStackName } from '../../config';
import AntDesign from '@expo/vector-icons/AntDesign';
export const Search = () => {
	const navigation = useNavigation();
	const [query, setQuery] = useState('');
	const [data, setData] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const search = useDebounce(query, 700);
	useEffect(() => {
		if (search) {
			const fetchMovie = async () => {
				const result = await searchMovie(search);
				if (result.statusCode === 200) {
					setIsSearching(false);
					setData(result.data);
				}
			};
			fetchMovie();
		}
	}, [search]);
	const handleSearching = (text) => {
		setQuery(() => {
			setIsSearching(true);
			if (!text) {
				setIsSearching(false);
				setData([]);
			}
			return text;
		});
	};
	return (
		<View className="bg-black flex-1">
			<View className="border-b border-b-zinc-800">
				<View className="flex-row items-center ">
					<Pressable
						className=" active:bg-slate-300 active:opacity-60 rounded-full p-1 justify-center"
						onPress={() => navigation.goBack()}
					>
						<Entypo name="chevron-left" size={30} color="white" />
					</Pressable>
					<View
						className=" flex-1 mr-8 h-6 items-center rounded-full flex-row px-2 relative"
						style={{ backgroundColor: '#333' }}
					>
						<Entypo name="magnifying-glass" size={16} color="white" />
						<TextInput
							numberOfLines={1}
							className="text-white text-xs flex-1 pl-1"
							placeholder="Search..."
							placeholderTextColor="white"
							value={query}
							onChangeText={(text) => handleSearching(text)}
						/>
						{isSearching && <ActivityIndicator size="small" color="orange" />}
					</View>
				</View>
			</View>
			<FlatList
				className="mt-2 "
				data={data}
				renderItem={({ item }) => {
					return (
						<Pressable
							className="active:bg-gray-600"
							onPress={() =>
								navigation.push(screenStackName.Movie, {
									movieID: item._id,
								})
							}
						>
							<View className=" flex-row items-center pr-2">
								<Image src={item.poster} className="w-20 h-10 ml-1 my-1" />
								<View className="justify-center ml-1 flex-1">
									<Text className="text-xs text-orange-500" numberOfLines={1}>
										{item.movieName}
									</Text>
									<Text className="text-xs text-slate-700" numberOfLines={1}>
										{item.otherName}
									</Text>
								</View>
								<AntDesign name="arrowright" size={24} color="gray" />
							</View>
						</Pressable>
					);
				}}
			/>
		</View>
	);
};
