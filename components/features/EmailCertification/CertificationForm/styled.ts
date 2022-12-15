import styled from 'styled-components';
import { FormCancelButton, FormConfirmButton } from 'components/shared/FormButtons/styled';

export const CertificationForm = styled.form`
	width: 100%;
	padding: 0 6.1% 120% 6.1%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > p {
		&:nth-child(1) {
			font-size: 1.125rem;
			margin: 0 0 5% 0;
			line-height: 30px;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.75rem;
			color: var(--color-dark-gray);
			margin: 0 0 13% 0;
		}
	}

	& > div {
		width: 100%;
		display: flex;
		margin-top: 2.2%;
	}
`;

export const ResendButton = styled.button`
	color: white;
	background-color: black;
	border-radius: 8px;
	font-size: 0.75rem;
	padding: 4.6% 3.5%;
	margin-left: 3.2%;
	flex-shrink: 0;
`;

export const CompleteSignUpButton = styled(FormConfirmButton)`
	width: 100%;
	margin-top: 19%;
`;

export const CertificationCancelButton = styled(FormCancelButton)`
	width: 100%;
	margin-top: 6.5%;
`;
