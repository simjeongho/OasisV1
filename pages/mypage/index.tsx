import styled from 'styled-components';
import MyInfo from 'components/features/MyPage/MyInfo';
import MyWorks from 'components/features/MyPage/MyWorks';
import WithAuth from 'utils/HOC/withAuth';

export const MyPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MyPage = () => {
	return (
		<MyPageContainer>
			<MyInfo />
			<MyWorks />
		</MyPageContainer>
	);
};

export default WithAuth(MyPage, true);
