import styled, { css } from 'styled-components';
import { AlertFailMessage } from 'components/shared/AlertMessages/styled';
import ArrowDownIcon from 'assets/images/mypage/arrow_down_icon.svg';

type StyledProps = {
	$selected: boolean;
};

export const UploadForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3% 0 40% 0;

	& > h2 {
		font-size: 1.125rem;
		width: 100%;
		text-align: left;
		margin: 0 0 7% 0;
		font-family: var(--font-nanum-bold);
	}

	& > ul {
		width: 100%;
	}
`;

export const UploadInputField = styled.li`
	width: 100%;
	padding: 0 1%;
	margin-bottom: 12%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > label {
		font-size: 1rem;
		margin: 0 0 4% 0;
		width: 100%;
		font-family: var(--font-nanum-bold);
	}
`;

export const UploadInputTitle = styled.p`
	font-size: 1rem;
	margin: 0 0 4% 0;
	width: 100%;
	font-family: var(--font-nanum-bold);
`;

export const UploadGuide = styled.p`
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	margin: 0 0 4% 0;
	width: 100%;
`;

export const FillBlankInstructions = styled(AlertFailMessage)`
	display: inline-block;
	flex: 0;
	font-size: 0.75rem;
	padding: 1.3% 3.9%;
	margin: 0 0 2% 0;
`;

export const UploadImageBox = styled.button`
	width: 100%;
	padding: 0;
	text-align: center;
	font-size: 2rem;
	background-color: #d8d8d8;
	position: relative;

	&:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	& > svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const RemoveUploadedImageButton = styled.button`
	position: absolute;
	top: -10px;
	right: -10px;
	background-color: white;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	padding: 0;
`;

export const UploadWorkInput = styled.input`
	width: 100%;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;

	&::placeholder {
		color: #b9b9b9;
	}
`;

export const UploadWorkTextArea = styled.textarea`
	width: 100%;
	height: 272px;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;

	&::placeholder {
		color: #b9b9b9;
	}
`;

export const WorkSelectInput = styled.select`
	width: 100%;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	resize: none;
	border: none;
	appearance: none;
	position: relative;
	cursor: pointer;
	background-image: url(${ArrowDownIcon});
	background-repeat: no-repeat;
	background-position: right 4% center;
`;

export const CopyrightOptionList = styled.ul`
	padding-left: 13px;
`;

export const CopyrightOptionItem = styled.li`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 12px;
	position: relative;

	& > input[type='radio'] {
		width: 24px;
		height: 24px;
		margin: 0 12px 0 0;
		border: 1px solid #363636;
		border-radius: 4px;
		appearance: none;

		&:checked {
			background-color: white;
			color: black;
		}
	}

	& > label {
		line-height: 18px;
	}

	& > svg {
		position: absolute;
		left: 5px;
		top: 7px;
	}
`;

export const CopyrightSubOptionList = styled.ul`
	width: 100%;
	padding-left: 36px;
	margin-top: 22px;
`;

export const CopyrightSubOptionButtonList = styled.ul`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 15px 0 22px 0;

	& > li {
		margin-bottom: 8px;
	}

	& > li:not(:last-child) {
		margin-right: 20px;
	}
`;

export const CopyrightSubOptionButton = styled.button`
	background: rgba(183, 183, 183, 0.1);
	border: 0.5px solid #848484;
	border-radius: 16px;
	padding: 7px 19px;
	white-space: nowrap;

	${({ $selected }: StyledProps) =>
		$selected &&
		css`
			background: rgba(2, 101, 249, 0.1);
			border: 0.5px solid #0265f9;
		`}
`;
