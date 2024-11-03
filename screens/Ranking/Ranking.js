import { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import LevelBackground from '../../components/LevelBackground/LevelBackground';
import { getTopRank } from '../../services/User/topRanking';

const title = ['Top', '', 'Sir', 'Level', 'Strength'];

const users = [
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
	{
		src: 'https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1726331195',
		name: 'Slimz',
		level: {
			name: 'Kết đan',
			index: 3,
		},
		power: 139438,
	},
];
export default Ranking = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchRank = async () => {
			const result = await getTopRank();
			setUsers(result.data);
		};
		fetchRank();
	}, []);
	const rankerIndex = (index) => {
		switch (index) {
			case 1:
				return st.firstRankerBg;
			case 2:
				return st.secondRankerBg;
			case 3:
				return st.thirdRankerBg;
			default:
				return '';
		}
	};

	const rankerBg = (index) => {
		switch (index) {
			case 1:
				return 'https://cdn.vectorstock.com/i/1000v/89/61/royal-background-vector-5978961.jpg';
			case 2:
				return 'https://wallpapers.com/images/hd/burgundy-background-g1bh8vyt6c5bmfu8.jpg';
			case 3:
				return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJJ5SUgEWbJkl7JFzgfZs5et4VMWE-sCWTQ&s';
			default:
				return '';
		}
	};

	return (
		<FlatList
			ListHeaderComponent={
				<View className="flex-1 bg-black">
					<Image
						src="https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/bxh.png"
						className="w-full h-10"
					/>
					<View className="mx-2">
						<View className="flex-row">
							{title.map((header, index) => {
								return (
									<View
										key={index}
										className="item-center justify-center mb-2"
										style={{ width: `${100 / title.length}%` }}
									>
										<Text className="text-orange-500 text-center">
											{header}
										</Text>
									</View>
								);
							})}
						</View>
						<View className="flex-row ">
							<FlatList
								data={users}
								renderItem={({ item, index }) => {
									index += 1;
									return (
										<ImageBackground resizeMode="stretch" src={rankerBg(index)}>
											<View
												key={item.key}
												className="flex-row py-2"
												style={[
													{ borderBottomWidth: 1, borderColor: '#333' },
												]}
											>
												{console.log(item)}
												<View
													className="justify-center items-center "
													style={{ width: `${100 / title.length}%` }}
												>
													<Text
														className="text-white text-center border text-xs w-6 h-6 p-1 rounded-xl border-white "
														style={[rankerIndex(index)]}
													>
														{index}
													</Text>
												</View>
												<View
													className="justify-center items-center"
													style={{ width: `${100 / title.length}%` }}
												>
													<Image
														src={item.avatar}
														className="w-9  h-9 border rounded-full"
													/>
												</View>
												<View
													className="justify-center items-center"
													style={{ width: `${100 / title.length}%` }}
												>
													<Text className="text-white text-center text-xs">
														{item.name}
													</Text>
												</View>
												<View
													className="justify-center items-center"
													style={{ width: `${100 / title.length}%` }}
												>
													<LevelBackground
														title={item.level.name}
														level={item.level.index}
													/>
												</View>
												<View
													className="justify-center items-center"
													style={{ width: `${100 / title.length}%` }}
												>
													<Text
														className="text-white text-center text-xs font-bold"
														style={{ color: 'orange' }}
													>
														{item.power}
													</Text>
												</View>
											</View>
										</ImageBackground>
									);
								}}
							/>
						</View>
					</View>
				</View>
			}
		/>
	);
};

const st = StyleSheet.create({
	firstRankerBg: {
		backgroundColor: 'black',
		borderColor: '#dba000',
	},
	secondRankerBg: {
		backgroundColor: 'black',
		borderColor: 'red',
	},
	thirdRankerBg: {
		backgroundColor: 'black',
		borderColor: 'blue',
	},
});
