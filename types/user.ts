export type Profile = {
	uuid: string;
	emailId: string;
	userName: string;
	universityName: string | null;
	universityMajor: string | null;
	universityVerify: string;
	profileImgPath: string;
	profileImgThumbnailPath: string;
	profileDescription: string;
	heartCount: number;
	hasHeart: boolean;
	ableUpdate: boolean;
};

export type UserSummary = {
	userUuid: string;
	userName: string;
	profileImage: string;
};
