import moment from 'moment';
import { Text, View } from 'react-native';

export default TimeAgo = ({ date }) => {
	const dateTimeAgo = moment(new Date(date)).fromNow();
	return <Text>{dateTimeAgo}</Text>;
};
