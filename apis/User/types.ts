export type EditProfileRequest = {
	profileDescription: string;
	profileFile?: File;
};

export type ChangePasswordRequest = {
	confirmation: string;
	currentPassword: string;
	newPassword: string;
};

export type ResetPasswordRequest = {
	emailId: string;
	userName: string;
};
