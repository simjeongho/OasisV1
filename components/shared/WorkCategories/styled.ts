import styled from 'styled-components';

type StyledProps = {
	$selected: boolean;
};

export const CategoryMenus = styled.ul`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 2%;
	overflow-x: auto;

	&::-webkit-scrollbar {
		display: block;
		height: 4.5px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-lighter-gray);
	}

	& > li {
		margin-bottom: 4px;
	}

	& > li:not(:last-child) {
		margin-right: 5%;
	}
`;

export const CategoryButton = styled.button`
	white-space: nowrap;
	padding: 8px 20px;
	border-radius: 20px;
	font-size: 0.875rem;
	font-family: var(--font-nanum-bold);
	border: 1px solid ${({ $selected }: StyledProps) => ($selected ? 'var(--color-blue)' : 'var(--color-light-gray)')};
	color: ${({ $selected }: StyledProps) => ($selected ? 'var(--color-blue)' : 'var(--color-light-gray)')};
	background-color: ${({ $selected }: StyledProps) => ($selected ? 'rgba(2, 101, 249, 0.1)' : 'transparent')};

	@media screen and (max-width: 1080px) {
		padding: 6px 15px;
	}

	@media screen and (max-width: 768px) {
		padding: 2vw 4.73vw;
	}

	@media screen and (max-width: 468px) {
		padding: 1.9vw 4.3vw;
	}

	@media screen and (min-width: 1600px) {
		padding: 12px 30px;
	}

	@media screen and (min-width: 1920px) {
		padding: 14px 35px;
	}
`;
