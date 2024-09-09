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
	return (
		<View style={{ display: isDisplay ? 'flex' : 'none' }} className="w-11/12 mx-auto">
			<View>
				<View className="flex-row flex-1">
					<Image
						src="https://hoathinh3d.in/wp-content/uploads/ultimatemember/30703/profile_photo.jpg?1725919147"
						className="w-10 h-10 mr-2 rounded-full"
					/>
					<TextInput
						className="text-white border border-white flex-1 rounded-lg p-1"
						editable
						multiline
						textAlignVertical="top"
						numberOfLines={3}
						placeholder="Feel free to comment"
						maxLength={500}
						placeholderTextColor="grey"
						keyboardType="default"
						// onChangeText={(text) => onChangeText(text)}
						// value={value}
					/>
				</View>
				<View
					className="rounded-md mt-2 self-end"
					style={{
						backgroundColor: '#555',
					}}
				>
					<TouchableOpacity activeOpacity={0.6}>
						<Text className="text-white font-bold text-xs p-2 capitalize">Send</Text>
					</TouchableOpacity>
				</View>
			</View>
			<FlatList
				scrollEnabled={false}
				data={list}
				className="mt-2"
				renderItem={({ item }) => <Comment data={item} />}
			/>
		</View>
	);
};
