import ChangePasswordForm from 'components/features/ChangePassword/ChangePasswordForm';
import styled from 'styled-components';
import WithAuth from 'utils/HOC/withAuth';

const ChangePasswordContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5% 95% 7.5%;

	& > h3 {
		font-size: 1.125rem;
		margin: 0 0 10.5% 0;
	}
`;

const ChangePasswordHeader = styled.header`
	width: 100%;
	margin-bottom: 10.5%;

	& > h2 {
		margin: 0;
		font-size: 1.5rem;
		font-family: var(--font-nanum-bold);
	}
`;

const ChangePassword = () => {
	return (
		<ChangePasswordContainer>
			<ChangePasswordHeader>
				<h2>비밀번호 변경</h2>
			</ChangePasswordHeader>
			<h3>새 비밀번호를 입력해주세요</h3>

			<ChangePasswordForm />
		</ChangePasswordContainer>
	);
};

export default WithAuth(ChangePassword, true);
