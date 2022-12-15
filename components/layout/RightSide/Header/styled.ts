import styled, { css } from 'styled-components';

type StyledProps = {
	$selected: boolean;
};

export const LayoutHeader = styled.header`
	width: 100%;
	padding: 2.8% 1%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const HeaderLogoTitle = styled.h1`
	font-size: 1.5rem;
	color: #222222;
	margin: 0;
	font-family: var(--font-nanum-bold);
	height: 30px;
	line-height: 33px;

	@media screen and (max-width: 320px) {
		font-size: 1.3rem;
		height: 26px;
		line-height: 28px;
	}
`;

export const HeaderLogo = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const HeaderNavMenu = styled.nav`
	flex: 1;
`;

export const HeaderMenuList = styled.ul`
	width: 100%;
	display: flex;
	justify-content: flex-end;

	& > li {
		margin: 0 4.2%;
	}

	@media screen and (max-width: 320px) {
		& > li {
			margin: 0 3.1%;
		}
	}
`;

export const HeaderMenuButton = styled.a`
	font-size: 0.875rem;
	background-color: transparent;
	color: var(--color-dark-gray);
	font-family: var(--font-nanum-bold);
	white-space: nowrap;

	${({ $selected }: StyledProps) =>
		$selected &&
		css`
			text-decoration: underline;
			color: black;
		`}
`;
