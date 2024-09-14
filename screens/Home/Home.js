// import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, StatusBar, FlatList, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import Entypo from '@expo/vector-icons/Entypo';
import TrendingMovie from './components/TrendingMovie/TrendingMovie';
import AntDesign from '@expo/vector-icons/AntDesign';
import ListMovie from './components/ListMovie/ListMovie';
import data from './mockData';
import { useMemo, useState, useEffect } from 'react';
import { movie } from './mockData';
const types = [
	{ id: 0, name: 'Huyền huyễn' },
	{ id: 1, name: 'Xuyên không' },
	{ id: 2, name: 'Trùng sinh' },
	{ id: 3, name: 'Tiên hiệp' },
	{ id: 4, name: 'Cổ trang' },
	{ id: 5, name: 'Kiếm hiệp' },
];
export default Home = () => {
	const st = styles;
	const [colors, setColors] = useState(null);
	const [isShowModal, setIsShowModal] = useState(false);

	const MainContent = useMemo(() => {
		return (
			<View style={[st.container]}>
				<TrendingMovie />
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<ListMovie data={item.list} header={item.releaseDay} />
					)}
				/>
			</View>
		);
	}, []);
	return (
		<>
			<View style={[{ paddingBottom: 10, position: 'fixed', backgroundColor: 'black' }]}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: 6,
					}}
				>
					<Image
						source={require('../../assets/logo.png')}
						style={{ width: 40, height: 40 }}
					/>
					<Entypo name="magnifying-glass" size={24} color="white" />
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View style={[st.topic, { marginRight: 10 }]}>
						<Text style={{ fontSize: 12, color: 'white' }}>Đang chiếu</Text>
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
					{types.map((type, index) => {
						return (
							<View key={index} style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>{type.name}</Text>
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
	);
};
