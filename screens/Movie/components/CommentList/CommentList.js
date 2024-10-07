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
import Comment from './components/Comment/Comment';
import CommentInput from './components/CommentInput/CommentInput';
import { useContext, useEffect, useState } from 'react';
import { getComments } from '../../../../services/Comment/getComments';
import { MovieContext } from '../../context/MovieProvider';

export default CommentList = ({ isDisplay }) => {
	const { movieID } = useContext(MovieContext);
	const [list, setList] = useState([]);
	useEffect(() => {
		const fetchComments = async () => {
			const result = await getComments(movieID);
			setList(result.data);
		};
		fetchComments();
	}, []);
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
				<CommentInput />
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
