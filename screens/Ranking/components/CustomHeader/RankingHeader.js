import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { screenStackName } from '../../../../config';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import OutsidePressHandler from 'react-native-outside-press';
import Modal from 'react-native-modal';
import LeftButtonHeader from '../../../../components/LeftButtonHeader/LeftButtonHeader';
const pjson = require('../../../../package.json');
const myAccountStackNavigator = [
	{
		name: 'Account',
		navigate: screenStackName.AccountSetting,
		icon: ({ size = '24', color = 'black' }) => (
			<AntDesign name="user" size={size} color={color} />
		),
	},
	{
		name: screenStackName.Ranking,
		navigate: screenStackName.Ranking,
		icon: ({ size = '24', color = 'black' }) => (
			<MaterialCommunityIcons name="progress-star" size={size} color={color} />
		),
	},
	{
		name: 'Help',
		navigate: screenStackName.HelpCenter,
		icon: ({ size = '24', color = 'black' }) => (
			<AntDesign name="questioncircleo" size={size} color={color} />
		),
	},
];
export default RankingHeader = (data) => {
	return <LeftButtonHeader />;
};
