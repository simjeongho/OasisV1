import styled from 'styled-components';

export const AlertSuccessMessage = styled.div`
	background-color: #f3f8ff;
	border: 0.5px solid var(--color-blue);
	border-radius: 20px;
	font-size: 0.875rem;
	color: var(--color-blue);
	font-family: var(--font-nanum-bold);
`;

export const AlertFailMessage = styled.div`
	background-color: #fff9f9;
	border: 0.5px solid var(--color-red);
	border-radius: 20px;
	font-size: 0.875rem;
	color: var(--color-red);
	font-family: var(--font-nanum-bold);
`;

export const AlertSuccessModal = styled(AlertSuccessMessage)`
	position: fixed;
	top: 50px;
	z-index: 10;
	font-size: 0.875rem;
	padding: 1% 1.8%;

	@media screen and (max-width: 1200px) {
		padding: 12px 20px;
	}

	@media screen and (max-width: 768px) {
		max-width: 90%;
	}
`;

export const AlertFailModal = styled(AlertFailMessage)`
	position: fixed;
	top: 50px;
	padding: 0.86% 1.45%;
	z-index: 10;
	font-size: 0.875rem;
	white-space: nowrap;

	@media screen and (max-width: 1200px) {
		padding: 12px 20px;
	}

	@media screen and (max-width: 768px) {
		white-space: pre-wrap;
		max-width: 90%;
	}
`;
