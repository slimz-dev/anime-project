import { useRef, useState } from 'react';
import { Text, View, FlatList, Image, ScrollView, Pressable } from 'react-native';
import MovieContainer from './components/MovieContainer/MovieContainer';
import MovieInfo from './components/MovieInfo/MovieInfo';

import { view, upcoming, recommend, top } from './mockData';

const data = [{ data: upcoming }, { data: recommend }, { top: true, data: top }];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default Trending = () => {
	const [active, setActive] = useState(0);
	const movieRef = useRef();

	function handleChangeTab(e, index) {
		movieRef.current.scrollToIndex({ index });
		setActive(index);
	}

	return (
		<View style={{ backgroundColor: 'black', flex: 1, paddingHorizontal: 10 }}>
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
										backgroundColor: active !== index ? 'black' : 'white',
										paddingHorizontal: 8,
										paddingVertical: 2,
										borderRadius: 20,
										marginRight: 8,
										height: 30,
									}}
									onLayout={(e) => {
										const layout = e.nativeEvent.layout;
										console.log(
											layout.height,
											layout.width,
											layout.x,
											layout.y
										);
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
											fontSize: 12,
											fontWeight: 'bold',
										}}
										className="text-2xl"
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
	);
};
