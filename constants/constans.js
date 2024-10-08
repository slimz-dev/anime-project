export const LEVEL_BACKGROUND = [
	{
		level: 1,
		background: require('../assets/level_1.gif'),
	},
	{
		level: 2,
		background: require('../assets/level_2.gif'),
	},
	{
		level: 3,
		background: require('../assets/level_3.gif'),
	},
	{
		level: 4,
		background: require('../assets/level_4.gif'),
	},
	{
		level: 5,
		background: require('../assets/level_5.gif'),
	},
	{
		level: 6,
		background: require('../assets/level_6.gif'),
	},
	{
		level: 7,
		background: require('../assets/level_7.gif'),
	},
	{
		level: 8,
		background: require('../assets/level_8.gif'),
	},
	{
		level: 9,
		background: require('../assets/level_9.gif'),
	},
];

export function findBackground(index) {
	const find = LEVEL_BACKGROUND.find((bg) => bg.level === index);
	if (find) {
		return find.background;
	}
}
