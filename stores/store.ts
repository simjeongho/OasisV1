import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootSaga } from './sagas/root';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './slices/root';

const isDevelopment = process.env.NODE_ENV === 'development';

export interface SagaStore extends Store {
	sagaTask?: Task;
}

const createStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer: rootReducer,
		middleware: [sagaMiddleware],
		devTools: isDevelopment,
	});

	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

	return store;
};

const wrapper = createWrapper(createStore, {
	debug: isDevelopment,
});

export default wrapper;

export const selectUser = (state: any) => state.user;
export const selectUI = (state: any) => state.ui;
export const selectSignUp = (state: any) => state.signup;
