import { UserData } from '../../apis/Auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_STATUS_INACTIVE, USER_UNIVERSITY_NO_VERIFICATION } from 'constants/user';

type InitialState = {
	isLogin: boolean;

	checkUserComplete: boolean;
	checkUserLoading: boolean;
	checkUserError: boolean;

	responseError: boolean;
	responseErrorMessage: string;

	responseSuccess: boolean;
	responseSuccessMessage: string;

	isTokenError: boolean;

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

const initialState: InitialState = {
	isLogin: false,
	checkUserComplete: false,
	checkUserLoading: false,
	checkUserError: false,
	responseError: false,
	responseErrorMessage: '',
	responseSuccess: false,
	responseSuccessMessage: '',
	isTokenError: false,
	uuid: '',
	emailId: '',
	userName: '',
	userStatus: USER_STATUS_INACTIVE,
	universityName: null,
	universityMajor: null,
	universityVerify: USER_UNIVERSITY_NO_VERIFICATION,
	termsOfService: false,
	privacyOfPolicy: false,
	marketingSubscription: false,
	profileImgPath: '',
	profileImgThumbnailPath: '',
	profileDescription: '',
	heartCount: 0,
	createDt: '',
	updateDt: '',
	ableUpdate: false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLogin(state) {
			state.isLogin = true;
		},
		userLogout(state) {
			state.isLogin = false;
			state.uuid = '';
			state.emailId = '';
			state.userName = '';
			state.userStatus = USER_STATUS_INACTIVE;
			state.universityName = null;
			state.universityMajor = null;
			state.universityVerify = USER_UNIVERSITY_NO_VERIFICATION;
			state.termsOfService = false;
			state.privacyOfPolicy = false;
			state.marketingSubscription = false;
			state.profileImgPath = '';
			state.profileImgThumbnailPath = '';
			state.profileDescription = '';
			state.heartCount = 0;
			state.createDt = '';
			state.updateDt = '';
			state.ableUpdate = false;
		},
		responseErrorWarning(state, action: PayloadAction<string>) {
			state.responseError = true;
			state.responseErrorMessage = action.payload;
		},
		responseErrorDone(state) {
			state.responseError = false;
			state.responseErrorMessage = '';
		},

		responseSuccessGuide(state, action: PayloadAction<string>) {
			state.responseSuccess = true;
			state.responseSuccessMessage = action.payload;
		},
		responseSuccessDone(state) {
			state.responseSuccess = false;
			state.responseSuccessMessage = '';
		},

		checkUserStart(state) {
			state.checkUserLoading = true;
			state.checkUserComplete = false;
		},
		checkUserDone(state) {
			state.checkUserLoading = false;
			state.checkUserComplete = true;
		},
		checkUserFail(state) {
			state.checkUserLoading = false;
			state.checkUserComplete = true;
			state.checkUserError = true;
		},

		setUserData(state, action: PayloadAction<UserData>) {
			state.isLogin = true;
			state.uuid = action.payload.uuid;
			state.emailId = action.payload.emailId;
			state.userName = action.payload.userName;
			state.userStatus = action.payload.userStatus;
			state.universityName = action.payload.universityName;
			state.universityMajor = action.payload.universityMajor;
			state.universityVerify = action.payload.universityVerify;
			state.termsOfService = action.payload.termsOfService;
			state.privacyOfPolicy = action.payload.privacyOfPolicy;
			state.marketingSubscription = action.payload.marketingSubscription;
			state.profileImgPath = action.payload.profileImgPath;
			state.profileImgThumbnailPath = action.payload.profileImgThumbnailPath;
			state.profileDescription = action.payload.profileDescription;
			state.heartCount = action.payload.heartCount;
			state.createDt = action.payload.createDt;
			state.updateDt = action.payload.updateDt;
			state.ableUpdate = action.payload.ableUpdate;
		},

		throwTokenError(state) {
			state.isTokenError = true;
		},
		endTokenError(state) {
			state.isTokenError = false;
		},
	},
});

export default userSlice;

export const {
	userLogin,
	userLogout,
	responseErrorWarning,
	responseErrorDone,
	responseSuccessGuide,
	responseSuccessDone,
	setUserData,
	checkUserStart,
	checkUserDone,
	checkUserFail,
	throwTokenError,
	endTokenError,
} = userSlice.actions;
