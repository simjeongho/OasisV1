import axios from 'axios';
import { apiWithInterceptor } from 'stores/sagas/user-saga';
import { HomeFeed } from 'types/work';
import { getStorageItem, storageAccessKey, storageTokenType } from './local-storage';

export const feedFetcher = (url: string): Promise<HomeFeed[]> =>
	axios.get(url).then((response) => response.data.artLogSummaryList);

export const worksFetcher = (url: string) => {
	const accessToken = getStorageItem(storageAccessKey);
	const tokenType = getStorageItem(storageTokenType);

	const config = {
		headers: {
			Authorization: `${tokenType} ${accessToken}`,
		},
	};

	const base = apiWithInterceptor();
	return base.get(url, config).then((response) => response.data.artLogSummaryList);
};

export const workDetailFetcher = (url: string) => axios.get(url).then((response) => response.data);

export const profileFetcher = (url: string, isLogin = false) => {
	if (isLogin) {
		const accessToken = getStorageItem(storageAccessKey);
		const tokenType = getStorageItem(storageTokenType);

		const config = {
			headers: {
				Authorization: `${tokenType} ${accessToken}`,
			},
		};

		const base = apiWithInterceptor();
		return base.get(url, config).then((response) => response.data.data.userInfo);
	}

	return axios.get(url).then((response) => response.data.data.userInfo);
};

export const usersFetcher = (url: string) => {
	const accessToken = getStorageItem(storageAccessKey);
	const tokenType = getStorageItem(storageTokenType);

	const config = {
		headers: {
			Authorization: `${tokenType} ${accessToken}`,
		},
	};

	const base = apiWithInterceptor();
	return base.get(url, config).then((response) => response.data.data.users);
};
