import styled from 'styled-components';

export const FormField = styled.li`
	margin-bottom: 11%;

	& > input {
		margin-top: 2.2%;
	}

	& > div {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 2.2%;
	}
`;

export const FormLabel = styled.label`
	width: 100%;
	font-size: 0.875rem;
	padding-left: 2%;
	font-family: var(--font-nanum-bold);
`;

export const FormInput = styled.input`
	width: 100%;
	font-size: 0.75rem;
	padding: 4.7% 5.7%;
	border-radius: 8px;
	border: 1px solid #363636;

	&::placeholder {
		color: var(--color-light-gray);
	}
`;

export const FormAlertMessage = styled.p`
	font-size: 0.75rem;
	color: var(--color-red);
	padding-left: 2%;
	margin: 1.4% 0 0 0;
`;
