import moment from 'moment';
import { Text, View } from 'react-native';

export default TimeAgo = ({ date, classname }) => {
	const dateTimeAgo = moment(new Date(date)).fromNow();
	return <Text className={classname}>{dateTimeAgo}</Text>;
};
