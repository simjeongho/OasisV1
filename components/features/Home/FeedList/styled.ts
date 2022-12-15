import styled from 'styled-components';
import { EmptyGuideBox } from 'components/shared/EmptyGuideBox/styled';

export const FeedListContainer = styled.section`
	width: 100%;

	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 5% 0;
		font-family: var(--font-nanum-bold);
	}
`;

export const FeedListWrapper = styled.ul`
	width: 100%;
	padding-top: 3%;
	margin-bottom: 8%;

	& > li {
		margin-bottom: 5%;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.27);
		border-radius: 8px;
	}
`;

export const FeedMoreButton = styled.button`
	display: block;
	margin: auto;
	border: 2px solid var(--color-dark-gray);
	background-color: transparent;
	width: 84%;
	font-size: 0.813rem;
	border-radius: 8px;
	color: var(--color-dark-gray);
	height: 40px;
	font-family: var(--font-nanum-black);
`;

export const EmptyGuideArea = styled(EmptyGuideBox)`
	margin: 11% auto 145% auto;
`;
