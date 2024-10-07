// import { StatusBar } from 'expo-status-bar';
import {
	Text,
	View,
	Image,
	StatusBar,
	FlatList,
	Modal,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import styles from './styles';
import Entypo from '@expo/vector-icons/Entypo';
import TrendingMovie from './components/TrendingMovie/TrendingMovie';
import AntDesign from '@expo/vector-icons/AntDesign';
import ListMovie from './components/ListMovie/ListMovie';
// import data from './mockData';
import { useMemo, useState, useEffect, useContext } from 'react';
import { queryMovieWithUpdateTime } from '../../services/Movie/getMovieWithUpdateTime';
import Loading from '../LoadingScreen/Loading';
import { getCategories } from '../../services/Categories/getCategories';

export default Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const st = styles;
	const [isShowModal, setIsShowModal] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		const renderList = async () => {
			for (let index = 2; index <= 8; index++) {
				const result = await queryMovieWithUpdateTime({
					params: {
						day: index,
						completed: false,
					},
				});
				if (result.statusCode === 200) {
					setData((prev) => {
						return [...prev, result.data];
					});
				}
			}
			const fetchCategories = await getCategories();
			setCategories(fetchCategories.data);
			setIsLoading(false);
		};
		renderList();
	}, []);
	const MainContent = () => {
		return (
			<View style={[st.container, { paddingBottom: 40 }]}>
				<TrendingMovie />
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<ListMovie data={item.list} header={item.releaseDay} />
					)}
				/>
			</View>
		);
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<View
						style={[
							{
								paddingBottom: 10,
								position: 'fixed',
								backgroundColor: 'black',
								paddingHorizontal: 10,
							},
						]}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 6,
								justifyContent: 'between',
							}}
						>
							<View className="flex-row items-center justify-between flex-1">
								<Image
									source={require('../../assets/logo.png')}
									style={{ width: 40, height: 40 }}
								/>
								<Pressable className=" active:bg-slate-300 active:opacity-60 rounded-full p-1">
									<Entypo name="magnifying-glass" size={24} color="white" />
								</Pressable>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View style={[st.topic, { marginRight: 10 }]}>
								<Text style={{ fontSize: 12, color: 'white' }}>Movie</Text>
							</View>
							<View style={[st.topic, { marginRight: 10 }]}>
								<Text style={{ fontSize: 12, color: 'white' }}>Series</Text>
							</View>
							<View style={st.topic}>
								<Text
									style={{ color: 'white', fontSize: 12, marginRight: 10 }}
									onPress={() => setIsShowModal(true)}
								>
									Categories
								</Text>
								<Entypo
									name="chevron-thin-down"
									style={{ marginTop: 2 }}
									size={10}
									color="white"
								/>
							</View>
						</View>
						<StatusBar />
					</View>
					<FlatList ListHeaderComponent={MainContent} />
					<Modal visible={isShowModal} animationType="fade" transparent>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'black',
								opacity: 0.9,
								position: 'relative',
							}}
						>
							{categories.map((cate, index) => {
								return (
									<View key={index} style={{ marginBottom: 20 }}>
										<Text style={{ color: 'white' }}>{cate.categoryName}</Text>
									</View>
								);
							})}
							<View
								style={{
									position: 'absolute',
									bottom: 20,
									backgroundColor: 'orange',
									borderRadius: 50,
									padding: 10,
									borderWidth: 1,
								}}
							>
								<Text onPress={() => setIsShowModal(false)}>
									<AntDesign name="close" size={24} color="black" />
								</Text>
							</View>
						</View>
					</Modal>
				</>
			)}
		</>
	);
};
