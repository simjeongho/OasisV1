import styled from 'styled-components';
export const FormConfirmButton = styled.button`
	border-radius: 8px;
	background-color: var(--color-blue);
	color: white;
	width: 78%;
	height: 40px;
	font-size: 0.813rem;
	font-family: var(--font-nanum-black);
`;

export const FormCancelButton = styled.a`
	border-radius: 8px;
	background-color: transparent;
	color: var(--color-blue);
	border: 2px solid var(--color-blue);
	width: 78%;
	height: 40px;
	font-size: 0.813rem;
	text-align: center;
	line-height: 37px;
	font-family: var(--font-nanum-black);
`;
