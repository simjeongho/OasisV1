export const storageAccessKey = 'OASIS_STORAGE_ACCESS_KEY';
export const storageRefreshKey = 'OASIS_STORAGE_REFRESH_KEY';
export const storageAccessExp = 'OASIS_STORAGE_ACCESS_TOKEN_EXP';
export const storageRefreshExp = 'OASIS_STORAGE_ACCESS_TOKEN_EXP';
export const storageTokenType = 'OASIS_STORAGE_TOKEN_TYPE';

export const getStorageItem = (key: string, initialValue = '') => {
	try {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	} catch (error) {
		return initialValue;
	}
};

export const setStorageItem = (key: string, value: string) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (key: string) => {
	window.localStorage.removeItem(key);
};
