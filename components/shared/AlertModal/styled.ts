import styled from 'styled-components';

type StyledProps = {
	$reverse: boolean;
};

export const AlertModalConatiner = styled.div`
	width: 100%;
	padding: 9.5% 7% 7.5% 7%;

	& > p {
		color: var(--color-darker-gray);
		&:nth-child(1) {
			font-size: 0.875rem;
			margin: 0 0 5% 0;
			font-family: var(--font-nanum-bold);
		}

    &:nth-child(2) {
			font-size: 0.75rem;
			margin: 0 0 10% 0;
		}
	}
	}
`;

export const AlertButtonList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;

	& > li {
		&:nth-child(1) {
			margin-right: 6%;
			& > button {
				color: ${({ $reverse = false }: StyledProps) => ($reverse ? 'var(--color-blue)' : 'var(--color-darker-gray)')};
			}
		}

		&:nth-child(2) {
			margin-left: 6%;
			& > button {
				color: ${({ $reverse = false }: StyledProps) => ($reverse ? 'var(--color-darker-gray)' : 'var(--color-blue)')};
			}
		}

		& > button {
			background-color: transparent;
			font-size: 0.875rem;
			font-family: var(--font-nanum-bold);
		}
	}
`;
