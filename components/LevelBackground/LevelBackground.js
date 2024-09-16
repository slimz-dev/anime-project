import { ImageBackground, Text } from 'react-native';

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

export default LevelBackground = ({ title, level }) => {
	function findBackground(index) {
		const find = levelBackground.find((bg) => bg.level === index);
		if (find) {
			return find.background;
		}
	}
	return (
		<ImageBackground
			src={findBackground(level)}
			style={{
				backgroundColor: '#898989',
			}}
		>
			<Text
				className="text-white capitalize text-center font-black  w-10 rounded-full"
				numberOfLines={1}
				style={{ fontSize: 6 }}
			>
				{title}
			</Text>
		</ImageBackground>
	);
};
