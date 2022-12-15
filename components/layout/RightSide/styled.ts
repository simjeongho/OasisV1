import styled from 'styled-components';

export const RightContainer = styled.div`
	width: 45%;
	min-width: 320px;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;
		min-width: 280px;
	}
`;
