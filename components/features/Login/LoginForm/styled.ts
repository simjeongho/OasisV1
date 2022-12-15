import styled from 'styled-components';
import { FormCancelButton, FormConfirmButton } from 'components/shared/FormButtons/styled';

export const LoginHeader = styled.header`
	width: 100%;
	display: flex;
	margin-bottom: 11%;
	align-items: center;

	& > span {
		font-size: 1.75rem;
	}

	& > h2 {
		margin: 0;
		font-size: 1.5rem;
		margin-left: 3.5%;
		font-family: var(--font-nanum-bold);
	}
`;

export const LoginFormContainer = styled.form`
	width: 100%;
	padding: 0 6%;
	display: flex;
	flex-direction: column;
`;

export const LoginButton = styled(FormConfirmButton)`
	width: 100%;
	margin: 2% 0 6.5% 0;
`;

export const MoveToSignUpButton = styled(FormCancelButton)`
	width: 100%;
	margin-bottom: 6.5%;
`;

export const FindAccountButton = styled.a`
	color: var(--color-dark-gray);
	font-size: 0.75rem;
	text-decoration: underline;
	background-color: transparent;
`;
