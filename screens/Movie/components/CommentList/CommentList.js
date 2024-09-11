import {
	Text,
	View,
	FlatList,
	Image,
	ImageBackground,
	TextInput,
	Button,
	TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import Comment from './components/Comment/Comment';

export default CommentList = ({ isDisplay, list }) => {
	function checkLength(container, length) {
		if (container.length !== 0) {
			container.forEach((cmt) => {
				if (cmt.commentsReply.length !== 0) {
					length = checkLength(cmt.commentsReply, length + 1);
				} else {
					length += 1;
				}
			});
		}
		return length;
	}

	return (
		<View style={{ display: isDisplay ? 'flex' : 'none' }} className="w-11/12 mx-auto">
			<View>
				<View className="my-2 border-b border-b-slate-900 ">
					<Text className="text-slate-600 uppercase border-b font-bold text-xs border-b-orange-300 self-start ">{`${checkLength(
						list,
						0
					)} comments`}</Text>
				</View>
				<View className="flex-row">
					<Image
						src="https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1725919147"
						className="w-10 h-10 mr-2 rounded-full"
					/>
					<TextInput
						className="text-white border border-white flex-1 rounded-lg "
						editable
						multiline
						textAlignVertical="top"
						numberOfLines={3}
						placeholder="Enter your comment..."
						maxLength={500}
						style={{ padding: 4 }}
						placeholderTextColor="grey"
						keyboardType="default"
						// onChangeText={(text) => onChangeText(text)}
						// value={value}
					/>
				</View>
				<View
					className="rounded-md mt-2 self-end "
					style={{
						backgroundColor: '#555',
					}}
				>
					<TouchableOpacity activeOpacity={0.6}>
						<Text className="text-white font-bold text-xs p-2 capitalize">Send</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="mt-1">
				<FlatList
					scrollEnabled={false}
					data={list}
					className="mt-2"
					renderItem={({ item }) => <Comment data={item} />}
				/>
			</View>
		</View>
	);
};
