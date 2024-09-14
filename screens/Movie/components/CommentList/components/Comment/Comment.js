import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import TimeAgo from '../../../../../../components/TimeAgo/TimeAgo';

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

export default Comment = ({ data: item, style, nested = 0 }) => {
	const [showReply, setShowReply] = useState(false);
	function findBackground(level) {
		const find = levelBackground.find((bg) => bg.level === level);
		if (find) {
			return find.background;
		}
		return '';
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
	return (
		<>
			<View className=" mb-2 flex-row " style={{ ...style }}>
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
								<Text className="text-white text-xs font-bold mr-3 ">
									{item.name}
								</Text>
							}
						>
							<ImageBackground
								src={findBackground(item.level.index)}
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
								<TimeAgo date="2024-09-9T16:46:44.124Z" />
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
								{item.replyTo}
							</Text>
						</View>
					)}
					<Text className="text-white text-xs mt-1">{item.content}</Text>
					<View className="mt-1 flex-row justify-between">
						<View className="flex-row">
							<View className="flex-row items-center mr-2">
								<AntDesign name="like1" size={12} color="grey" />
								<Text className="text-white opacity-60  text-xs ml-1">
									{item.likeCount}
								</Text>
							</View>
							<View className="flex-row items-center">
								<Ionicons name="arrow-redo" size={12} color="grey" />
								<Text className="text-white opacity-60  text-xs ml-1">Reply</Text>
							</View>
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
