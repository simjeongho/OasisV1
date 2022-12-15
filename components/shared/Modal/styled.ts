import styled from 'styled-components';

type StyledProps = {
	$dark: boolean;
};

export const ModalContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	z-index: 10;
	overflow: hidden;
	background-color: ${({ $dark = false }: StyledProps) => ($dark ? 'rgba(183, 183, 183, 0.3)' : 'transparent')};
`;

export const ModalCard = styled.div`
	position: fixed;
	top: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-white);
	width: 21%;
	border: 0.5px solid var(--color-dark-gray);
	border-radius: 16px;

	@media screen and (max-width: 768px) {
		width: 70%;
	}
`;
