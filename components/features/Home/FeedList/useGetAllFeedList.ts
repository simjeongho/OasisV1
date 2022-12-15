import { useMemo, useCallback } from 'react';
import { feedFetcher } from 'utils/fetcher';
import useSWRInfinite from 'swr/infinite';
import API_URL, { API_HOST } from 'apis/api';
import { HomeFeed } from 'types/work';
import { AMOUNT_OF_DATA_AT_ONCE } from 'constants/swr';

type ReturnTypes = [HomeFeed[], boolean, () => void];

const useGetAllFeedList = (selectedCategory: string): ReturnTypes => {
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		feed: { basic },
	} = API_URL;

	const getKey = (index: number, previousPageData: HomeFeed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${basic}?category=${selectedCategory}&page=${index}&size=${limit}`;
	};

	const { data: allFeedsData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		revalidateOnFocus: false,
	});

	const isEmpty = useMemo(() => allFeedsData?.[0]?.length === 0, [allFeedsData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allFeedsData && allFeedsData[allFeedsData.length - 1]?.length < limit) || false,
		[isEmpty, allFeedsData],
	);

	const handleClickMoreFeedsButton = useCallback(() => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	}, [setSize, isReachingEnd]);

	return [allFeedsData?.flat() || [], isReachingEnd, handleClickMoreFeedsButton];
};

export default useGetAllFeedList;
