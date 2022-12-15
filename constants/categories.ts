export const categories = [
	{
		id: '0',
		name: '전체',
		query: 'ALL',
	},
	{
		id: '1',
		name: '미술',
		query: 'ART',
	},
	{
		id: '2',
		name: '문예창작',
		query: 'CREATIVE_WRITING',
	},
	{
		id: '3',
		name: '음악',
		query: 'MUSIC',
	},
	{
		id: '4',
		name: '무용',
		query: 'DANCE',
	},
	{
		id: '5',
		name: '연극영화',
		query: 'THEATRE_FILM',
	},
];

export const uploadCategories = categories.slice(1);

export const CATEGORIES = {
	ALL: '전체',
	ART: '미술',
	CREATIVE_WRITING: '문예창작',
	MUSIC: '음악',
	DANCE: '무용',
	THEATRE_FILM: '연극영화',
};
