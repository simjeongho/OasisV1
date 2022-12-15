import { useCallback, useState } from 'react';
import styled from 'styled-components';
import WorkDetailContent from 'components/features/Detail/WorkDetailContent';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import API_URL, { API_HOST } from 'apis/api';
import wrapper from 'stores/store';
import { WorkDetailInfo } from 'types/work';
import { changeHeader, initHeader } from 'stores/slices/ui-slice';
import SubHeader from 'components/layout/RightSide/SubHeader';
import useCheckUserData from 'hooks/useCheckUserData';

const DetailContainer = styled.main`
	width: 100%;
	padding: 5.7% 1.9% 30% 1.9%;
`;

interface IParams extends ParsedUrlQuery {
	workId: string;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	const { workId } = context.params as IParams;

	const {
		work: { basic },
	} = API_URL;

	try {
		const workDetailFallbackData = await axios.get(`${API_HOST}${basic}/${workId}`).then((response) => response.data);

		store.dispatch(changeHeader({ headerType: 'sub', isButtonVisible: false }));

		return {
			props: { workDetailFallbackData },
		};
	} catch (error) {
		return {
			props: { workDetailFallbackData: null },
		};
	}
});

const WorkDetail = ({
	workDetailFallbackData,
}: InferGetServerSidePropsType<{
	workDetailFallbackData: WorkDetailInfo | null;
}>) => {
	useCheckUserData();

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClickDeleteWorkButton = useCallback(() => {
		setShowDeleteModal(true);
	}, []);

	const handleClickCancelButton = useCallback(() => {
		setShowDeleteModal(false);
	}, []);

	return (
		<>
			<SubHeader buttonName="삭제" buttonType="button" clickFn={handleClickDeleteWorkButton} />
			<DetailContainer>
				<WorkDetailContent
					workDetailFallbackData={workDetailFallbackData}
					showDeleteModal={showDeleteModal}
					handleClickCancelButton={handleClickCancelButton}
				/>
			</DetailContainer>
		</>
	);
};

export default WorkDetail;
