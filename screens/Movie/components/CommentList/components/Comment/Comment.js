import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import TimeAgo from '../../../../../../components/TimeAgo/TimeAgo';
import CommentInput from '../CommentInput/CommentInput';

const levelBackground = [
	{
		level: 1,
		background: require('../../../../../../assets/level_1.gif'),
	},
	{
		level: 2,
		background: require('../../../../../../assets/level_2.gif'),
	},
	{
		level: 3,
		background: require('../../../../../../assets/level_3.gif'),
	},
	{
		level: 4,
		background: require('../../../../../../assets/level_4.gif'),
	},
	{
		level: 5,
		background: require('../../../../../../assets/level_5.gif'),
	},
	{
		level: 6,
		background: require('../../../../../../assets/level_6.gif'),
	},
	{
		level: 7,
		background: require('../../../../../../assets/level_7.gif'),
	},
	{
		level: 8,
		background: require('../../../../../../assets/level_8.gif'),
	},
	{
		level: 9,
		background: require('../../../../../../assets/level_9.gif'),
	},
];

export default Comment = ({ data: item, style, nested = 0 }) => {
	const [showReply, setShowReply] = useState(false);
	const [isCreateReply, setIsCreateReply] = useState(false);

	function findBackground(level) {
		const find = levelBackground.find((bg) => bg.level === level);
		if (find) {
			return find.background;
		}
	}

	function handleToggleReply() {
		setShowReply(() => {
			return !showReply;
		});
	}
	function checkLength(container, length) {
		container.forEach((cmt) => {
			if (cmt.commentsReply.length !== 0) {
				length = checkLength(cmt.commentsReply, length + 1);
			} else {
				length += 1;
			}
		});
		return length;
	}
	const replyTitle = showReply
		? `Hidden (${checkLength(item.commentsReply, 0)}) replies`
		: `Show (${checkLength(item.commentsReply, 0)}) replies`;

	const handleReply = () => {
		setIsCreateReply(!isCreateReply);
	};
	return (
		<>
			<View className=" mb-2 flex-row " style={{ ...style }}>
				<View className="mr-2  items-center w-10">
					<Image src={item.createdBy.avatar} className="w-10 h-10 rounded-full mb-1" />
					<ImageBackground
						source={findBackground(item.createdBy.level.index)}
						style={{
							backgroundColor: '#898989',
						}}
					>
						<Text
							className="text-white capitalize text-center font-black  w-10 "
							style={{ fontSize: 6 }}
							numberOfLines={1}
						>
							{item.createdBy.level.name}
						</Text>
					</ImageBackground>
				</View>
				<View style={{ backgroundColor: '#292929', flex: 1 }} className="p-1 rounded-lg">
					<View className="flex-row border-b pb-1" style={{ borderColor: '#333' }}>
						<MaskedView
							style={{ flex: 1 }}
							maskElement={
								<Text className="text-white text-xs font-bold mr-3 ">
									{item.createdBy.name}
								</Text>
							}
						>
							<ImageBackground
								source={findBackground(item.createdBy.level.index)}
								style={{ flex: 1, backgroundColor: '#898989' }}
							/>
						</MaskedView>
						<View className="flex-row items-center ">
							<AntDesign
								name="clockcircle"
								size={8}
								color="white"
								style={{ opacity: 0.6 }}
							/>
							<Text className="text-xs text-white opacity-60 ml-1">
								<TimeAgo date={new Date(item.createdAt)} />
							</Text>
						</View>
					</View>
					{item.replyTo && (
						<View className="flex-row border-l pl-1 border-white">
							<Ionicons name="chatbubbles" size={12} color="grey" />
							<Text className="italic text-slate-500 mx-1" style={{ fontSize: 10 }}>
								Reply to
							</Text>
							<Text
								className="italic text-slate-400 font-bold underline"
								style={{ fontSize: 10 }}
							>
								{item.replyTo.createdBy.name}
							</Text>
						</View>
					)}
					<Text className="text-white text-xs mt-1">{item.content}</Text>
					<View className="mt-1 flex-row justify-between">
						<View className="flex-row">
							<View className="flex-row items-center mr-3">
								<TouchableOpacity activeOpacity={0.2}>
									<AntDesign name="like1" size={12} color="grey" />
								</TouchableOpacity>
								<Text className="text-white opacity-60  text-xs ml-1">
									{item.likeUsers.length}
								</Text>
							</View>
							<TouchableOpacity activeOpacity={0.6} onPress={handleReply}>
								<View className="flex-row items-center">
									<Ionicons name="arrow-redo" size={12} color="grey" />
									<Text className="text-white opacity-60  text-xs ml-1">
										Reply
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						{item.commentsReply.length !== 0 && (
							<TouchableOpacity activeOpacity={0.8} onPress={handleToggleReply}>
								<View className="flex-row items-center">
									<Text
										style={{ fontSize: 10 }}
										className="text-white opacity-60  mr-1"
									>
										{replyTitle}
									</Text>
									<View>
										{showReply ? (
											<FontAwesome name="chevron-up" size={12} color="grey" />
										) : (
											<FontAwesome
												name="chevron-down"
												size={12}
												color="grey"
											/>
										)}
									</View>
								</View>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
			{isCreateReply && <CommentInput style={{ ...style }} replyTo={item._id} />}
			{showReply && (
				<FlatList
					data={item.commentsReply}
					renderItem={({ item }) => (
						<Comment
							data={item}
							style={{ marginLeft: 40 * (nested >= 2 ? 2 : nested + 1) }}
							nested={nested + 1}
						/>
					)}
				/>
			)}
		</>
	);
};
