import AuthService from 'apis/Auth/auth-service';
import API_URL, { API_HOST } from 'apis/api';
import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
	responseErrorWarning,
	responseErrorDone,
	checkUserStart,
	checkUserDone,
	setUserData,
	checkUserFail,
	throwTokenError,
	userLogout,
	endTokenError,
	responseSuccessGuide,
	responseSuccessDone,
} from 'stores/slices/user-slice';
import { delay } from 'stores/sagas/root';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';
import { CheckUserResult } from 'apis/Auth/types';
import { RESPONSE_STATUS_200, RESPONSE_STATUS_400, RESPONSE_STATUS_500 } from 'constants/api';
import { ALERT_TIME_OUT } from 'constants/alert';

const authService = new AuthService();

export const apiWithInterceptor = () => {
	const base = axios.create({
		baseURL: API_HOST,
	});

	base.interceptors.response.use(
		async (response) => {
			const { config, data } = response;
			if (data?.statusCode >= RESPONSE_STATUS_400 && data?.statusCode < RESPONSE_STATUS_500) {
				const result = await authService.getNewToken();

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
				const result = await authService.getNewToken();

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

	return base;
};

async function checkUserRequest() {
	const {
		auth: { check },
	} = API_URL;

	const accessToken = getStorageItem(storageAccessKey);
	const tokenType = getStorageItem(storageTokenType);

	const config = {
		headers: {
			Authorization: `${tokenType} ${accessToken}`,
		},
	};

	const base = apiWithInterceptor();

	const response = await base.get(check, config);

	return response;
}

function* handleError() {
	yield delay(ALERT_TIME_OUT);
	yield put(responseErrorDone());
}

function* handleSuccess() {
	yield delay(ALERT_TIME_OUT);
	yield put(responseSuccessDone());
}

function* handleTokenError() {
	yield put(responseErrorWarning('다시 로그인 해주세요.'));
	yield put(userLogout());
	yield put(endTokenError());
}

function* handleCheckUser() {
	try {
		const response: AxiosResponse<CheckUserResult> = yield call(checkUserRequest);
		const {
			data: { user },
			status,
		} = response;

		if (status === RESPONSE_STATUS_200 && user) {
			yield put(setUserData(user));
		}
		yield put(checkUserDone());
	} catch (error: any) {
		yield put(checkUserFail());
	}
}

function* watchResponseError() {
	yield takeLatest(responseErrorWarning, handleError);
}

function* watchResponseSuccess() {
	yield takeLatest(responseSuccessGuide, handleSuccess);
}

function* watchTokenError() {
	yield takeLatest(throwTokenError, handleTokenError);
}

function* watchCheckUser() {
	yield takeLatest(checkUserStart, handleCheckUser);
}

export function* userSaga() {
	yield all([fork(watchResponseError), fork(watchResponseSuccess), fork(watchTokenError), fork(watchCheckUser)]);
}
