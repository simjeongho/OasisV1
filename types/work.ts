import { UploadedImage } from './upload';
import { UserSummary } from './user';

export type Feed = {
	userUuid: string;
	userName: string;
	profileImage: string;
	uuid: string;
	title: string;
	coverFile: UploadedImage;
	description: string;
	createDate: string;
	updateDate: string;
	ableDelete: boolean;
};

export type HomeFeed = {
	user: UserSummary;
	uuid: string;
	title: string;
	coverFile: UploadedImage;
	createDate: string;
	updateDate: string;
	ableDelete: boolean;
};

export type WorkImage = {
	id: number;
	file: File;
	thumbnail: string;
	type: string;
};

export type CommercialCopyright = 'COMMERCIAL' | 'NONE_COMMERCIAL';
export type ModifyCopyright = 'ALLOW' | 'NOT_ALLOW' | 'DERIVED_FROM_SAME_CONDITION_ALLOW';
export type Categories = 'ALL' | 'ART' | 'CREATIVE_WRITING' | 'MUSIC' | 'DANCE' | 'THEATRE_FILM';

export type WorkDetailInfo = {
	uuid: string;
	ableDelete: boolean;
	artFiles: UploadedImage[];
	category: Categories;
	cclType: { cclCommercialType: CommercialCopyright; contentModifyType: ModifyCopyright } | null;
	collaborators: string | null;
	createDate: string;
	description: string;
	tags: string[] | null;
	title: string;
	updateDate: string | null;
	user: {
		profileImage: string;
		userName: string;
		userUuid: string;
	};
};
