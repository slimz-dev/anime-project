import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import LeftButtonHeader from '../../../../components/LeftButtonHeader/LeftButtonHeader';
export default LoginHeader = (data) => {
	const navigation = useNavigation();
	return <LeftButtonHeader />;
};
