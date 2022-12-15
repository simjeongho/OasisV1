import axios, { AxiosInstance } from 'axios';
import API_URL, { API_HOST } from 'apis/api';
import AuthService, { IAuthService } from 'apis/Auth/auth-service';
import { UploadWorkRequest } from './types';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';
import { RESPONSE_STATUS_400, RESPONSE_STATUS_500 } from 'constants/api';

class WorkService {
	private base: AxiosInstance;
	private workUrl;

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
		this.workUrl = API_URL.work;
		this.authService = new AuthService();
	}

	async uploadWork({
		title,
		description,
		category,
		workImages,
		tags,
		collaborators,
		copyright,
		commercialCopyright,
		modifyCopyright,
	}: UploadWorkRequest) {
		const { basic } = this.workUrl;

		const config = this.authService.setAuthHeader();
		config.headers['Content-Type'] = 'multipart/form-data';

		const formData = new FormData();

		const artLog = `{"title":"${title}","description":"${description}","category":"${category}","tags":[${tags
			.split(',')
			.map((tag) => `"${tag.trim()}"`)}],"collaborators":"${collaborators}","cclType":${
			copyright === 'hide'
				? null
				: `{"cclCommercialType":"${commercialCopyright}","contentModifyType":"${modifyCopyright}"}`
		}}`;

		formData.append('artLog', artLog);

		for (let i = 0; i < workImages.length; i++) {
			const { file } = workImages[i];
			formData.append('artLogFiles', file);
		}

		const response = await this.base.post(basic, formData, config);
		const result = response.status;

		return result;
	}

	async deleteWork(workId: string) {
		const { basic } = this.workUrl;

		const config = this.authService.setAuthHeader();

		const response = await this.base.delete(`${basic}/${workId}`, config);

		const statusCode = response.status;

		return statusCode;
	}
}

export default WorkService;
