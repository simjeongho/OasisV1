import { useEffect, useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import API_URL, { API_HOST } from 'apis/api';
import { usersFetcher } from 'utils/fetcher';
import { TOKEN_ERROR } from 'constants/errors';
import { useDispatch } from 'react-redux';
import { throwTokenError } from 'stores/slices/user-slice';
import { Profile } from 'types/user';
import { AMOUNT_OF_DATA_AT_ONCE, DEDUPING_INTERVAL_TIME } from 'constants/swr';

const useGetAllHeartUsers = () => {
	const {
		user: { heart },
	} = API_URL;

	const [allHeartUsersWorks, setAllHeartUsersWorks] = useState<Profile[]>([]);
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const getKey = (index: number, previousPageData: Profile[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${heart}/search?page=${index}&pageSize=${limit}`;
	};

	const dispatch = useDispatch();

	const { data: allHeartUsersWorksData, setSize } = useSWRInfinite(getKey, usersFetcher, {
		dedupingInterval: DEDUPING_INTERVAL_TIME,
		revalidateOnFocus: false,
		onErrorRetry: (error) => {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
		},
	});

	const getAllHeartUsersWorks = () => {
		if (allHeartUsersWorksData) {
			setAllHeartUsersWorks(allHeartUsersWorksData.flat());
		}
	};

	useEffect(() => {
		getAllHeartUsersWorks();
	}, [allHeartUsersWorksData]);

	const isEmpty = useMemo(() => allHeartUsersWorksData?.[0]?.length === 0, [allHeartUsersWorksData]);
	const isReachingEnd = useMemo(
		() =>
			isEmpty ||
			(allHeartUsersWorksData && allHeartUsersWorksData[allHeartUsersWorksData.length - 1]?.length < limit) ||
			false,
		[isEmpty, allHeartUsersWorksData],
	);

	const handleClickMoreUsersButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	return allHeartUsersWorks;
};

export default useGetAllHeartUsers;
