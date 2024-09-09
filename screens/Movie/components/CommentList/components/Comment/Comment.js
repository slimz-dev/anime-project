import { Text, View, Image, ImageBackground } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';

const levelBackground = [
	{
		level: 2,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/hon_dau_la_052024.gif',
	},
	{
		level: 3,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/do_kiep_ky_2024.gif',
	},
	{
		level: 4,
		background:
			'https://hoathinh3d.run/wp-content/themes/halimmovies-child/assets/image/gif/dau_tong.gif',
	},
	{
		level: 5,
		background:
			'https://hoathinh3d.in/wp-content/themes/halimmovies-child/assets/image/gif/vu_tru_ton_gia.gif',
	},
	{
		level: 6,
		background:
			'https://hoathinh3d.run/wp-content/themes/halimmovies-child/assets/image/gif/thanh_te_27.gif',
	},
];

export default Comment = ({ data: item }) => {
	function findBackground(level) {
		const find = levelBackground.find((bg) => bg.level === level);
		if (find) {
			return find.background;
		}
		return '';
	}

	return (
		<View className=" mb-1 flex-row">
			<View className="mr-2  items-center w-10">
				<Image src={item.img} className="w-10 h-10 rounded-full mb-1" />
				<ImageBackground
					src={findBackground(item.level.index)}
					style={{
						backgroundColor: '#898989',
					}}
				>
					<Text
						className="text-white capitalize text-center font-black  w-10 "
						style={{ fontSize: 6 }}
						numberOfLines={1}
					>
						{item.level.name}
					</Text>
				</ImageBackground>
			</View>
			<View style={{ backgroundColor: '#292929', flex: 1 }} className="p-1 rounded-lg">
				<View className="flex-row border-b pb-1" style={{ borderColor: '#333' }}>
					<MaskedView
						style={{ flex: 1 }}
						maskElement={
							<Text className="text-white text-xs font-bold mr-3 ">{item.name}</Text>
						}
					>
						<ImageBackground
							src={findBackground(item.level.index)}
							style={{ flex: 1, backgroundColor: '#898989' }}
						/>
					</MaskedView>
					<View className="flex-row items-center">
						<AntDesign
							name="clockcircle"
							size={8}
							color="white"
							style={{ opacity: 0.6 }}
						/>
						<Text className="text-xs text-white opacity-60 ml-1">1h trước</Text>
					</View>
				</View>
				<Text className="text-white text-xs">{item.content}</Text>
				<View></View>
			</View>
		</View>
	);
};
