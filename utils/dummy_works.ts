import DummyWorkImage from 'assets/images/dummy/dummy_image_1.png';
import DummyUserImage from 'assets/images/dummy/dummy_image_2.png';
import { StaticImageData } from 'next/image';

type DummyWork = {
	uuid: string;
	coverFile: StaticImageData;
	title: string;
	profileImage: StaticImageData;
	userName: string;
};

export const dummyWorks: DummyWork[] = [
	{
		uuid: '1',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '2',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '3',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '4',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '5',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '6',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '7',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '8',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '9',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '10',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
	{
		uuid: '11',
		coverFile: DummyWorkImage,
		title: '패션 잡지와 명화의 완벽한 조화',
		profileImage: DummyUserImage,
		userName: 'username',
	},
];
