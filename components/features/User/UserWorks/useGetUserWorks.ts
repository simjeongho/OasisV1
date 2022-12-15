import { useState, useEffect, useMemo } from 'react';
import API_URL, { API_HOST } from 'apis/api';
import useSWRInfinite from 'swr/infinite';
import { worksFetcher } from 'utils/fetcher';
import { HomeFeed } from 'types/work';
import { AMOUNT_OF_DATA_AT_ONCE, DEDUPING_INTERVAL_TIME } from 'constants/swr';

type ReturnType = [HomeFeed[], boolean, () => void];

const useGetUserWorks = (userId: string, userWorkFallbackData: HomeFeed[]): ReturnType => {
	const [allUserWorks, setAllUserWorks] = useState<HomeFeed[]>([]);
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: HomeFeed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/@${userId}?category=ALL&page=${index}&size=${limit}`;
	};

	const { data: allUserWorksData, setSize } = useSWRInfinite(getKey, worksFetcher, {
		dedupingInterval: DEDUPING_INTERVAL_TIME,
		revalidateOnFocus: false,
		fallbackData: userWorkFallbackData || undefined,
	});

	const getAllUserWorks = () => {
		if (allUserWorksData) {
			setAllUserWorks(allUserWorksData.flat());
		}
	};

	useEffect(() => {
		getAllUserWorks();
	}, [allUserWorksData]);

	const isEmpty = useMemo(() => allUserWorksData?.[0]?.length === 0, [allUserWorksData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allUserWorksData && allUserWorksData[allUserWorksData.length - 1]?.length < limit) || false,
		[isEmpty, allUserWorksData],
	);

	const handleClickMoreWorksButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	return [allUserWorks, isReachingEnd, handleClickMoreWorksButton];
};

export default useGetUserWorks;
