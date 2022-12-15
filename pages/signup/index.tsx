import styled from 'styled-components';
import SignUpForm from 'components/features/SignUp/SignUpForm';
import { SignUpHeader } from 'components/features/SignUp/SignUpForm/styled';
import WithAuth from 'utils/HOC/withAuth';

export const SignUpContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SignUp = () => {
	return (
		<SignUpContainer>
			<SignUpHeader>
				<span>👋</span>
				<h2>회원가입</h2>
			</SignUpHeader>
			<SignUpForm />
		</SignUpContainer>
	);
};

export default WithAuth(SignUp);
