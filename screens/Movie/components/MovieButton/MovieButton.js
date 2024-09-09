import { Pressable, Text, View } from 'react-native';
import Animated, {
	Easing,
	ReduceMotion,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
export default MovieButton = ({ text, icon }) => {
	const scale = useSharedValue(0);
	const handleTouch = () => {
		scale.value = withTiming(1.4, {
			duration: 100,
			easing: Easing.in,
			reduceMotion: ReduceMotion.System,
		});
	};

	const handleTouchOut = () => {
		scale.value = 0;
	};

	return (
		<Pressable
			style={({ pressed }) => [
				{
					marginRight: 20,
					borderRadius: 99999,
					// backgroundColor: pressed ? '#524D4D' : 'transparent',
					position: 'relative',
				},
			]}
			onPressIn={() => handleTouch(1)}
			onPressOut={() => handleTouchOut(1)}
		>
			<View className="w-14 h-14  items-center justify-center flex-none  ">
				{icon}
				<Text className="capitalize text-white mt-1" style={{ fontSize: 10 }}>
					{text}
				</Text>
			</View>
			<Animated.View
				style={{
					backgroundColor: '#524D4D',
					transform: [{ scale }],
				}}
				className=" items-center justify-center rounded-full -z-10 w-14 h-14 absolute"
			/>
		</Pressable>
	);
};
