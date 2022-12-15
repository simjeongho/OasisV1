import UserInfo from 'components/features/User/UserInfo';
import UserWorks from 'components/features/User/UserWorks';
import styled from 'styled-components';
import { selectUser } from 'stores/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import API_URL, { API_HOST } from 'apis/api';
import { AMOUNT_OF_DATA_AT_ONCE } from 'constants/swr';
import { Profile } from 'types/user';
import { HomeFeed } from 'types/work';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCheckUserData from 'hooks/useCheckUserData';

const UserPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
`;

interface IParams extends ParsedUrlQuery {
	userId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { userId } = context.params as IParams;

	try {
		const {
			user: { basic, search, works },
		} = API_URL;

		const userInfoFallbackData: Profile = await axios
			.get(`${API_HOST}${basic}/${userId}${search}`)
			.then((response) => response.data.data.userInfo);

		const userWorkFallbackData: HomeFeed[] = await axios
			.get(`${API_HOST}${works}/@${userId}?category=ALL&page=0&size=${AMOUNT_OF_DATA_AT_ONCE}`)
			.then((response) => response.data.artLogSummaryList);

		return {
			props: { userId, userInfoFallbackData, userWorkFallbackData },
		};
	} catch (error) {
		return {
			props: { userId, userInfoFallbackData: null, userWorkFallbackData: null },
		};
	}
};

const User = ({
	userId,
	userInfoFallbackData,
	userWorkFallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useCheckUserData();

	const { uuid } = useSelector(selectUser);
	const Router = useRouter();

	useEffect(() => {
		if (userId === uuid) {
			Router.replace('/mypage');
		}
	}, [userId, uuid]);

	return (
		<UserPageContainer>
			<UserInfo userId={userId} userInfoFallbackData={userInfoFallbackData} />
			<UserWorks userId={userId} userWorkFallbackData={userWorkFallbackData} />
		</UserPageContainer>
	);
};

export default User;
