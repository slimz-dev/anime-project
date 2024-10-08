import { ImageBackground, Text } from 'react-native';

import { LEVEL_BACKGROUND } from '../../constants/constans';

function findBackground(index) {
	const find = LEVEL_BACKGROUND.find((bg) => bg.level === index);
	if (find) {
		return find.background;
	}
}
export default LevelBackground = ({ title, level, style, textStyle }) => {
	return (
		<ImageBackground
			source={findBackground(level)}
			style={{
				backgroundColor: '#898989',
				...style,
			}}
		>
			<Text
				className="text-white capitalize text-center font-black   rounded-full"
				numberOfLines={1}
				style={{ fontSize: 6, ...textStyle }}
			>
				{title}
			</Text>
		</ImageBackground>
	);
};
