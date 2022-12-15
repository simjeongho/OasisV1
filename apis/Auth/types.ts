import { ApiResult } from 'apis/api';

export type SignUpRequest = {
	emailId: string;
	password: string;
	userName: string;
	termsOfService: boolean;
	privacyOfPolicy: boolean;
	marketingSub: boolean;
};

export type LoginRequest = {
	emailId: string;
	password: string;
};

export type LoginResult = {
	token: {
		accessToken: string;
		expiresIn: string;
		refreshToken: string;
		refreshExpiresIn: string;
		tokenType: string;
		message: string;
	};
	user: UserData;
};

export type UserData = {
	uuid: string;
	emailId: string;
	userName: string;
	userStatus: 'ACTIVE' | 'INACTIVE' | 'DRAW';
	universityName: string | null;
	universityMajor: string | null;
	universityVerify: 'VERIFICATION' | 'NO_VERIFICATION' | 'VERIFYING' | 'HOLDING_VERIFICATION';
	termsOfService: boolean;
	privacyOfPolicy: boolean;
	marketingSubscription: boolean;
	profileImgPath: string;
	profileImgThumbnailPath: string;
	profileDescription: string;
	heartCount: number;
	createDt: string;
	updateDt: string;
	ableUpdate: boolean;
};
export type CheckUserResult = {
	message: string;
	status: string;
	user: UserData | null;
};

export type SendVerificationCodeResult = {
	uuid: string;
	createDt: string;
};
