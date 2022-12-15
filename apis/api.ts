export type ApiResult<T> = {
	timeStamp: string;
	statusCode: number;
	status: string;
	data: T;
};

export type BasicResult = ApiResult<{
	message: string;
}>;

export const API_HOST = 'https://dev.api.oasislog.co.kr/oasis';

const API_URL = {
	auth: {
		signup: '/sign-up',
		login: '/sign-in',
		logout: '/signOut',
		check: '/token-health',
		token: '/issue-token',
		sendCode: '/email/verification-code',
		verifyCode: '/email/verification-code/verifying',
	},
	work: {
		basic: '/art-logs',
	},
	feed: {
		basic: '/art-stories',
	},
	user: {
		basic: '/account/profile',
		update: '/account/profile/update',
		search: '/search',
		works: '/art-logs',
		heart: '/account/profile/heart',
		school: '/account/profile/studentIdCard/upload',
		password: '/account/password',
		draw: '/account/draw',
		resetPassword: '/account/password',
	},
};

export default API_URL;
