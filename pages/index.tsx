import FeedList from 'components/features/Home/FeedList';
import { useDispatch } from 'react-redux';
import { responseSuccessGuide } from 'stores/slices/user-slice';
import styled from 'styled-components';
import Banner from 'assets/images/home/oasis_banner@2x.png';
import { useEffect } from 'react';
import Image from 'next/image';
import useCheckUserData from 'hooks/useCheckUserData';
import { useRouter } from 'next/router';

export const HomeBanner = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5.6%;
	padding: 0 3.3%;
	width: 100%;
	border-radius: 24px;
	background-color: transparent;
`;

export const HomeContainer = styled.main`
	width: 100%;
	padding: 5.6% 3.3%;
`;

const Home = () => {
	useCheckUserData();

	const dispatch = useDispatch();

	const { query, replace } = useRouter();

	useEffect(() => {
		if (query?.signup_success) {
			dispatch(responseSuccessGuide('회원가입 성공! 반가워요 :)'));
			replace('/', undefined, {
				shallow: true,
			});
			return;
		}
		if (query?.login_success) {
			dispatch(responseSuccessGuide('로그인 성공! 오아시스에 오신 걸 환영해요'));
			replace('/', undefined, {
				shallow: true,
			});
			return;
		}
	}, []);

	const handleClickBanner = () => {
		window.open(
			'https://o4sis.notion.site/19df71865e5149b898db49068763b464?v=cdbeac27833c4840809963fa1c8c6224',
			'_blank',
			'noopener',
		);
	};

	return (
		<>
			<HomeBanner type="button" onClick={handleClickBanner}>
				<Image src={Banner} alt="오아시스 서비스 소개 배너" />
			</HomeBanner>
			<HomeContainer>
				<FeedList />
			</HomeContainer>
		</>
	);
};

export default Home;
