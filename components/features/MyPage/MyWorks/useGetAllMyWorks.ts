import { useEffect, useMemo, useState, useCallback } from 'react';
import { worksFetcher } from 'utils/fetcher';
import { HomeFeed } from 'types/work';
import API_URL, { API_HOST } from 'apis/api';
import useSWRInfinite from 'swr/infinite';
import { AMOUNT_OF_DATA_AT_ONCE } from 'constants/swr';

type ReturnType = [HomeFeed[], boolean, () => void];

const useGetAllMyWorks = (uuid: string): ReturnType => {
	const [allMyWorks, setAllMyWorks] = useState<HomeFeed[]>([]);
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: HomeFeed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/@${uuid}?category=ALL&page=${index}&size=${limit}`;
	};

	const { data: allMyWorksData, setSize } = useSWRInfinite(getKey, worksFetcher, {
		revalidateOnFocus: false,
	});

	const getAllMyWorks = () => {
		if (allMyWorksData) {
			setAllMyWorks(allMyWorksData.flat());
		}
	};

	useEffect(() => {
		getAllMyWorks();
	}, [allMyWorksData]);

	const isEmpty = useMemo(() => allMyWorksData?.[0]?.length === 0, [allMyWorksData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allMyWorksData && allMyWorksData[allMyWorksData.length - 1]?.length < limit) || false,
		[isEmpty, allMyWorksData],
	);

	const handleClickMoreWorksButton = useCallback(() => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	}, [setSize, isReachingEnd]);

	return [allMyWorks, isReachingEnd, handleClickMoreWorksButton];
};

export default useGetAllMyWorks;
