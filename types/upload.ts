export type UserUploadFile = {
	file: File;
	thumbnail: string;
	type: string;
};

export type UploadedImage = {
	uuid: string;
	fileUuid: string;
	fileName: string;
	extension: string;
	fileType: string;
	size: number;
	path: string;
	thumbnailPath: string;
	referenceInfoType: string;
	sort: number;
	createDate: string;
	updateDate: boolean;
};
