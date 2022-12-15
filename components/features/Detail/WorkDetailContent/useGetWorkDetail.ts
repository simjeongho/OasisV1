import { useMemo } from 'react';
import { WorkDetailInfo } from 'types/work';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/store';
import { COPYRIGHT_INSTRUCTIONS } from 'constants/copyright';
import useSWRImmutable from 'swr/immutable';
import API_URL, { API_HOST } from 'apis/api';
import { workDetailFetcher } from 'utils/fetcher';
import { useRouter } from 'next/router';

type ReturnTypes = [WorkDetailInfo | undefined, boolean, string[]];

const useGetWorkDetail = (workDetailFallbackData: WorkDetailInfo | null): ReturnTypes => {
	const {
		query: { workId },
	} = useRouter();

	const { uuid } = useSelector(selectUser);

	const {
		work: { basic },
	} = API_URL;

	const { data: workDetailData } = useSWRImmutable<WorkDetailInfo>(`${API_HOST}${basic}/${workId}`, workDetailFetcher, {
		fallbackData: workDetailFallbackData ? workDetailFallbackData : undefined,
	});

	const isMine = useMemo(() => workDetailData?.user?.userUuid === uuid, [workDetailData, uuid]);

	const cclInstruction = useMemo(() => {
		if (!workDetailData) return [];

		const { cclType } = workDetailData;

		if (cclType === null) return ['자유롭게 이용 가능'];

		const { cclCommercialType, contentModifyType } = cclType;

		return [
			'저작자 표시',
			cclCommercialType ? COPYRIGHT_INSTRUCTIONS[cclCommercialType] : '',
			contentModifyType ? COPYRIGHT_INSTRUCTIONS[contentModifyType] : '',
		].filter((ccl) => ccl !== '');
	}, [workDetailData]);

	return [workDetailData, isMine, cclInstruction];
};

export default useGetWorkDetail;
