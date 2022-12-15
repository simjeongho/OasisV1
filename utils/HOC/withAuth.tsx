import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { responseErrorWarning, userLogout, setUserData } from 'stores/slices/user-slice';
import { RESPONSE_STATUS_200 } from 'constants/api';
import API_URL from 'apis/api';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';
import { apiWithInterceptor } from 'stores/sagas/user-saga';
import WhiteLoadingSection from 'components/shared/WhiteLoadingSection';

const WithAuth = (Component: any, block = false) => {
	const AuthenticatedComponent = () => {
		const Router = useRouter();
		const dispatch = useDispatch();

		const [isAllowed, setIsAllowed] = useState(false);

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

					setIsAllowed(true);
				} else if (block) {
					dispatch(responseErrorWarning('로그인이 필요한 페이지 입니다'));

					Router.push('/');
				} else {
					setIsAllowed(true);
				}
			} catch (error) {
				if (block) {
					dispatch(userLogout());
					dispatch(responseErrorWarning('로그인이 필요한 페이지 입니다'));
					Router.push('/login');
				} else {
					setIsAllowed(true);
				}
			}
		};

		useEffect(() => {
			checkUserData();
		}, []);

		return isAllowed ? <Component /> : <WhiteLoadingSection height="80vh" />;
	};

	return AuthenticatedComponent;
};

export default WithAuth;
