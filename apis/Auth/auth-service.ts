import {
	storageAccessKey,
	storageRefreshKey,
	setStorageItem,
	removeStorageItem,
	getStorageItem,
	storageAccessExp,
	storageRefreshExp,
	storageTokenType,
} from 'utils/local-storage';
import axios, { AxiosInstance } from 'axios';
import API_URL, { API_HOST, BasicResult } from 'apis/api';
import { LoginRequest, SignUpRequest, LoginResult, SendVerificationCodeResult } from 'apis/Auth/types';
import { TOKEN_ERROR } from 'constants/errors';

export interface IAuthService {
	setAuthHeader(): {
		headers: {
			Authorization: string;
			'Content-Type'?: string;
		};
	};
	getNewToken(): Promise<boolean>;
}

class AuthService implements IAuthService {
	private base: AxiosInstance;
	private authUrl;

	constructor() {
		this.base = axios.create({
			baseURL: API_HOST,
		});
		this.authUrl = API_URL.auth;
	}

	async signup(data: SignUpRequest) {
		const { signup } = this.authUrl;

		const response = await this.base.post(signup, data);
		const result: BasicResult = await response.data;

		return result;
	}

	async login(data: LoginRequest) {
		const { login } = this.authUrl;

		const response = await this.base.post(login, data);
		const result: LoginResult = await response.data;
		const statusCode = response.status;

		const {
			token: { accessToken, refreshToken, expiresIn, refreshExpiresIn, tokenType },
		} = result;

		setStorageItem(storageAccessKey, accessToken);
		setStorageItem(storageRefreshKey, refreshToken);
		setStorageItem(storageAccessExp, expiresIn);
		setStorageItem(storageRefreshExp, refreshExpiresIn);
		setStorageItem(storageTokenType, tokenType);

		return statusCode;
	}

	async getNewToken() {
		try {
			const { token } = this.authUrl;

			const preAccessToken = getStorageItem(storageAccessKey);
			const preRefreshToken = getStorageItem(storageRefreshKey);
			const preExpiresIn = getStorageItem(storageAccessExp);
			const preRefreshExpiresIn = getStorageItem(storageRefreshExp);
			const preTokenType = getStorageItem(storageTokenType);

			if (!preAccessToken || !preRefreshToken || !preExpiresIn || !preRefreshExpiresIn || !preTokenType) return false;

			const data = {
				accessToken: preAccessToken,
				refreshToken: preRefreshToken,
				expiresIn: preExpiresIn,
				refreshExpiresIn: preRefreshExpiresIn,
				tokenType: preTokenType,
			};

			const response = await this.base.post(token, data);
			const result: LoginResult = await response.data;

			const {
				token: { accessToken, refreshToken, expiresIn, refreshExpiresIn, tokenType },
			} = result;

			setStorageItem(storageAccessKey, accessToken);
			setStorageItem(storageRefreshKey, refreshToken);
			setStorageItem(storageAccessExp, expiresIn);
			setStorageItem(storageRefreshExp, refreshExpiresIn);
			setStorageItem(storageTokenType, tokenType);

			return true;
		} catch (error) {
			this.logout();
			throw new Error(TOKEN_ERROR);
		}
	}

	logout() {
		removeStorageItem(storageAccessKey);
		removeStorageItem(storageRefreshKey);
		removeStorageItem(storageAccessExp);
		removeStorageItem(storageRefreshExp);
		removeStorageItem(storageTokenType);
	}

	async sendEmailVerificationCode(email: string) {
		const { sendCode } = this.authUrl;

		const response = await this.base.post(`${sendCode}?email=${email}`);
		const { uuid }: SendVerificationCodeResult = await response.data;

		const statusCode = response.status;

		return {
			statusCode,
			uuid,
		};
	}

	async checkVerificationCode(uuid: string, verificationCode: string) {
		const { verifyCode } = this.authUrl;

		const data = {
			uuid,
			verificationCode,
		};
		const response = await this.base.post(verifyCode, data);

		const statusCode = response.status;

		return statusCode;
	}

	setAuthHeader() {
		const accessToken = getStorageItem(storageAccessKey);
		const tokenType = getStorageItem(storageTokenType);

		const config = {
			headers: {
				Authorization: `${tokenType} ${accessToken}`,
			},
		};

		return config;
	}
}

export default AuthService;
