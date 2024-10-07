import { Text, View, FlatList, Image, Pressable, ImageBackground } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { screenStackName } from '../../../../config';
const monthFull = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export default MovieInfo = ({ data: item }) => {
	const navigation = useNavigation();
	const movieRef = useRef();
	const monthReleased = new Date(item.releasedDate).getMonth();
	return (
		<View style={{ flex: 1 }} ref={movieRef}>
			<View style={{ borderRadius: 8, overflow: 'hidden', width: '100%' }}>
				<Image src={item.poster} style={{ width: '100%', height: 120 }} />
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 40,
				}}
			>
				<View
					style={{
						color: 'white',
						width: '60%',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Pressable
						onPress={() => {
							navigation.navigate(screenStackName.Movie, { movieID: item._id });
						}}
						style={({ pressed }) => {
							return {
								backgroundColor: pressed ? 'rgba(67, 61, 64, 0.8)' : 'black',
								height: '100%',
							};
						}}
					>
						<ImageBackground
							src={item.nameImg}
							style={{ width: '100%', height: 40 }}
							resizeMode="contain"
						/>
					</Pressable>
				</View>
				<View style={{ flex: 1 }}>
					<Pressable
						style={({ pressed }) => {
							return {
								backgroundColor: pressed ? 'rgba(67, 61, 64, 0.8)' : 'black',
								height: '100%',
							};
						}}
					>
						<View
							style={{
								alignItems: 'center',
								paddingHorizontal: 4,
								paddingVertical: 8,
							}}
						>
							{!item.isReleased ? (
								<>
									<Feather name="bell" size={16} color="white" />
									<Text style={{ color: 'white', opacity: 0.6, fontSize: 8 }}>
										Remind me
									</Text>
								</>
							) : (
								<>
									<AntDesign name="plus" size={18} color="white" />
									<Text style={{ color: 'white', opacity: 0.6, fontSize: 8 }}>
										My List
									</Text>
								</>
							)}
						</View>
					</Pressable>
				</View>
				<View style={{ flex: 1 }}>
					<Pressable
						style={({ pressed }) => {
							return {
								backgroundColor: pressed ? 'rgba(67, 61, 64, 0.8)' : 'black',
								height: '100%',
							};
						}}
					>
						<View
							style={{
								alignItems: 'center',
								paddingHorizontal: 4,
								paddingVertical: 8,
							}}
						>
							{!item.isReleased ? (
								<>
									<Feather name="info" size={16} color="white" />
									<Text style={{ color: 'white', opacity: 0.6, fontSize: 8 }}>
										Info
									</Text>
								</>
							) : (
								<>
									<Entypo name="controller-play" size={18} color="white" />
									<Text style={{ color: 'white', opacity: 0.6, fontSize: 8 }}>
										Play
									</Text>
								</>
							)}
						</View>
					</Pressable>
				</View>
			</View>
			<View>
				{!item.isReleased && (
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>{`Coming ${new Date(item.releasedDate).getDate()} ${
						monthFull[monthReleased]
					}`}</Text>
				)}
				<Text
					style={{
						color: 'white',
						width: '100%',
						textAlign: 'justify',
						fontSize: 10,
						opacity: 0.6,
						marginBottom: 4,
						marginTop: 6,
					}}
					numberOfLines={4}
				>
					{item.description}
				</Text>
				<FlatList
					data={item.types}
					numColumns={item.categories.length}
					renderItem={({ item, index }) =>
						index == 0 ? (
							<Text
								style={{
									color: 'white',
									fontSize: 10,
									textTransform: 'capitalize',
								}}
							>
								{item}
							</Text>
						) : (
							<View
								style={{
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<Entypo name="dot-single" size={10} color="gray" />
								<Text
									style={{
										color: 'white',
										fontSize: 10,
										textTransform: 'capitalize',
									}}
								>
									{item}
								</Text>
							</View>
						)
					}
				/>
			</View>
		</View>
	);
};
