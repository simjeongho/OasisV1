import styled from 'styled-components';

export const LayoutFooter = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 5.8% 7.8%;
	width: 100%;
	background: #f0f0f0;
	border-radius: 8px;
`;

export const FooterOptionList = styled.ul`
	& > li {
		margin-bottom: 9.9%;
	}
`;

export const FooterOptionButton = styled.button`
	font-size: 0.75rem;
	padding: 0;
	text-decoration: underline;
	color: black;
	background-color: transparent;
`;

export const FooterCompanyInfo = styled.address`
	color: #848484;
	font-style: normal;
	font-size: 0.75rem;
	margin-top: 1.8%;

	& > ul {
		& > li > button {
			padding: 0;
			display: flex;
			align-items: center;
			cursor: pointer;
			color: #848484;
			font-size: 0.75rem;
			background-color: transparent;

			& > svg {
				margin: 4% 2% 4% 0;
				flex-shrink: 0;
			}
		}
	}
`;

export const FooterCopyright = styled.p`
	font-size: 0.75rem;
	color: #848484;
	margin: 4.2% 0 0 0;
	font-family: var(--font-nanum-light);
`;
