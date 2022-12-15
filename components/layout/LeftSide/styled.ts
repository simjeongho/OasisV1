import styled from 'styled-components';

export const LeftContainer = styled.div`
	position: sticky;
	top: 0;
	width: 55%;
	height: 100vh;
	padding-right: 4%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const LeftTitle = styled.p`
	width: 100%;
	font-size: 1.625rem;
	color: #2f2f2f;
	margin: 0 0 2.2% 0;
	font-family: var(--font-nanum-bold);
`;

export const LeftDescription = styled.p`
	width: 100%;
	font-size: 0.875rem;
	color: #313131;
	margin: 0;
`;
