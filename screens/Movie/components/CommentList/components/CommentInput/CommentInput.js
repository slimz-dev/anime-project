import { useContext, useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Toast } from 'toastify-react-native';
import { AuthContext } from '../../../../../../context/AuthProvider/AuthProvider';
import { createComment } from '../../../../../../services/Comment/createComment';
import { MovieContext } from '../../../../context/MovieProvider';

export default CommentInput = ({ style, replyTo }) => {
	const { movieID } = useContext(MovieContext);
	const { user } = useContext(AuthContext);
	const [value, setValue] = useState('');
	const handleChange = (text) => {
		setValue(text);
	};
	const handleSubmit = async () => {
		if (value) {
			const data = {
				createdBy: user.myInfo._id,
				content: value,
				replyTo,
			};
			const result = await createComment(movieID, data);
			if (result.statusCode === 201) {
				Toast.success('Comment submitted');
				setValue('');
			}
		} else {
			Toast.error("Can't send empty comment");
		}
	};
	return (
		<>
			<View style={{ ...style }}>
				<View className="flex-row">
					<Image src={user.myInfo.avatar} className="w-10 h-10 mr-2 rounded-full" />
					<TextInput
						className="text-white border border-white flex-1 rounded-lg p-3"
						editable
						multiline
						textAlignVertical="top"
						numberOfLines={3}
						placeholder="Enter your comment..."
						maxLength={500}
						placeholderTextColor="grey"
						keyboardType="default"
						onChangeText={(text) => handleChange(text)}
						value={value}
					/>
				</View>
				<View
					className="rounded-md mt-2 self-end "
					style={{
						backgroundColor: '#555',
					}}
				>
					<TouchableOpacity activeOpacity={0.6} onPress={handleSubmit}>
						<Text className="text-white font-bold text-xs p-2 capitalize">Send</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};
