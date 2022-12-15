import styled from 'styled-components';

type StyledProps = {
	$works: number;
};

export const WorksContainer = styled.section`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: ${({ $works }: StyledProps) => ($works === 0 ? '48% 0 40% 0' : '4% 0 20% 0')};
`;

export const GuideMessage = styled.p`
	font-size: 1rem;
	color: var(--color-dark-gray);
`;

export const UploadWorkButton = styled.a`
	margin-bottom: 20px;
`;

export const UploadedMyWorks = styled.ul`
	width: 100%;
	margin-bottom: 8%;

	& > li {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 5%;
		}
	}
`;

export const WorksMoreButton = styled.button`
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
