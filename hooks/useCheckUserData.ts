import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API_URL from 'apis/api';
import { RESPONSE_STATUS_200 } from 'constants/api';
import { apiWithInterceptor } from 'stores/sagas/user-saga';
import { setUserData, userLogout } from 'stores/slices/user-slice';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';

const useCheckUserData = () => {
	const dispatch = useDispatch();

	const checkUserData = async () => {
		try {
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

			const {
				data: { user },
				status,
			} = response;

			if (status === RESPONSE_STATUS_200 && user) {
				dispatch(setUserData(user));
			}
		} catch (error) {
			dispatch(userLogout());
		}
	};

	useEffect(() => {
		checkUserData();
	}, []);
};

export default useCheckUserData;
