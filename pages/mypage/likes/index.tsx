import styled from 'styled-components';
import { MyPageContainer } from '..';
import WithAuth from 'utils/HOC/withAuth';
import MyLikesList from 'components/features/Likes/MyLikesList';

export const MyLikes = styled.section`
	width: 100%;
	padding-bottom: 120%;

	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 11% 0;
		font-family: var(--font-nanum-bold);
	}

	& > ul {
		width: 100%;
	}
`;

const Likes = () => {
	return (
		<MyPageContainer>
			<MyLikes aria-labelledby="mypage_likes_label">
				<h2 id="mypage_likes_label">내가 하트 준 계정</h2>
				<MyLikesList />
			</MyLikes>
		</MyPageContainer>
	);
};

export default WithAuth(Likes, true);
