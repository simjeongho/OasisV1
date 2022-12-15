import styled, { css } from 'styled-components';

type StyledProps = {
	expanded: boolean;
};

export const WorkDetailIntro = styled.section`
	& > span {
		display: inline-block;
		padding: 8px 19px;
		white-space: nowrap;
		margin-bottom: 14px;
		margin-left: 1.5%;
		border-radius: 20px;
		font-size: 0.875rem;
		font-family: var(--font-nanum-bold);
		border: 1px solid var(--color-blue);
		color: var(--color-blue);
		background-color: rgba(2, 101, 249, 0.1);
	}

	& > h2 {
		font-size: 1.5rem;
		padding: 0 1.5%;
		margin: 0 0 3.9% 0;
		font-family: var(--font-nanum-bold);
	}
`;

export const WorkDetailDescription = styled.section`
	& > p {
		margin: 0;
		padding: 5%;
		font-size: 0.75rem;
		line-height: 20px;
	}
`;

export const WorkWriterInfo = styled.section`
	padding: 2%;
`;

export const WorkWriterLink = styled.a`
	display: flex;
	align-items: center;
	font-size: 0.75rem;
	flex: 1;
	color: black;
	font-family: var(--font-nanum-bold);
	width: 100%;

	& > span {
		margin-right: 10px;
		width: 30px;
		height: 0;
		padding-bottom: 30px;
		overflow-y: hidden;
		position: relative;
		border-radius: 50%;
	}
`;

export const WorkDetailImages = styled.section`
	padding: 1.5% 0;
`;

export const WorkDatailImage = styled.li`
	&:not(:last-child) {
		margin-bottom: 5%;
	}
`;

export const WorkSubInfo = styled.section`
	width: 100%;
	padding: 4% 3%;
`;

export const WorkSubInfoToggleButton = styled.button`
	display: flex;
	align-items: center;
	background-color: transparent;
	padding: 0;

	& > span {
		font-size: 1rem;
		font-family: var(--font-nanum-bold);
		margin-right: 14px;
		line-height: 14px;
	}

	& > svg {
		margin-bottom: 2px;
		${({ expanded }: StyledProps) =>
			expanded &&
			css`
				transform: rotate(180deg);
			`}
	}
`;

export const WorkSubInfoTable = styled.table`
	width: 100%;
	margin-top: 2%;
	table-layout: auto;

	& > tbody {
		& > tr {
			height: 28px;

			& > td:first-child {
				color: var(--color-dark-gray);
				font-size: 0.75rem;
				font-family: var(--font-nanum-bold);
				white-space: nowrap;
			}
			& > td:last-child {
				font-size: 0.75rem;
				font-family: var(--font-nanum-bold);
				padding-left: 12px;

				& > span {
					font-size: 0.75rem;
					font-family: var(--font-nanum-bold);
					margin-right: 13px;
					white-space: nowrap;
				}
			}
		}
	}
`;
