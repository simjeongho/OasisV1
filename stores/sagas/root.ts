import { all, fork } from 'redux-saga/effects';
import { userSaga } from 'stores/sagas/user-saga';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* rootSaga() {
	yield all([fork(userSaga)]);
}
