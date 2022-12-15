import { RESPONSE_STATUS_400, RESPONSE_STATUS_500 } from 'constants/api';
import axios, { AxiosInstance } from 'axios';
import API_URL, { API_HOST, BasicResult } from 'apis/api';
import AuthService, { IAuthService } from 'apis/Auth/auth-service';
import { ChangePasswordRequest, EditProfileRequest, ResetPasswordRequest } from './types';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';

class UserService {
	private base: AxiosInstance;
	private userUrl;

	private authService: IAuthService;

	constructor() {
		this.base = axios.create({
			baseURL: API_HOST,
		});
		this.base.interceptors.response.use(
			async (response) => {
				const { config, data } = response;
				if (data?.statusCode >= RESPONSE_STATUS_400 && data?.statusCode < RESPONSE_STATUS_500) {
					const result = await this.authService.getNewToken();

					if (result) {
						const accessToken = getStorageItem(storageAccessKey);
						const tokenType = getStorageItem(storageTokenType);

						if (config.headers) {
							config.headers['Authorization'] = `${tokenType} ${accessToken}`;
						}

						return axios(config);
					}
				}
				return response;
			},
			async (error) => {
				const {
					config,
					response: { status },
				} = error;

				if (status >= RESPONSE_STATUS_400 && status < RESPONSE_STATUS_500) {
					const result = await this.authService.getNewToken();

					if (result) {
						const accessToken = getStorageItem(storageAccessKey);
						const tokenType = getStorageItem(storageTokenType);

						config.headers['Authorization'] = `${tokenType} ${accessToken}`;
						return axios(config);
					}
				}

				return error;
			},
		);
		this.userUrl = API_URL.user;
		this.authService = new AuthService();
	}

	async toggleHeartCount(userId: string) {
		const { heart } = this.userUrl;

		const config = this.authService.setAuthHeader();

		await this.base.put(`${heart}/${userId}/send`, null, config);
	}

	async uploadProfile({ profileDescription, profileFile }: EditProfileRequest) {
		const { update } = this.userUrl;

		const config = this.authService.setAuthHeader();
		config.headers['Content-Type'] = 'multipart/form-data';

		const formData = new FormData();

		formData.append('profileDescription', profileDescription);

		if (profileFile) {
			formData.append('profileFile', profileFile);
		}

		const response = await this.base.put(update, formData, config);

		const result: BasicResult = await response.data;

		return result;
	}

	async certifySchool(schoolIdCard: File) {
		const { school } = this.userUrl;

		const config = this.authService.setAuthHeader();

		const formData = new FormData();

		formData.append('studentIdCard', schoolIdCard);

		const response = await this.base.put(`${school}`, formData, config);

		const result: BasicResult = await response.data;

		return result;
	}

	async changePassword({ confirmation, currentPassword, newPassword }: ChangePasswordRequest) {
		const { password } = this.userUrl;

		const config = this.authService.setAuthHeader();
		const data = {
			confirmation,
			currentPassword,
			newPassword,
		};

		const response = await this.base.patch(password, data, config);
		const status = response.status;
		return status;
	}

	async resetPassword({ emailId, userName }: ResetPasswordRequest) {
		const { resetPassword } = this.userUrl;
		const config = this.authService.setAuthHeader();
		const data = {
			emailId,
			userName,
		};

		const response = await this.base.put(resetPassword, data, config);
		const status = response.status;
		return status;
	}
}

export default UserService;
