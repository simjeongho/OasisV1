import { FormConfirmButton } from '../../../shared/FormButtons/styled';
import styled from 'styled-components';
import Image from 'next/image';

export const EditProfileContainer = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 40%;

	& > h2 {
		width: 100%;
		text-align: left;
		margin: 6% 0 7.5% 0;
		font-size: 1.125rem;
		font-family: var(--font-nanum-bold);
	}
`;

export const UploadedProfileImage = styled(Image)`
	border-radius: 50%;
`;

export const ChangeImageButton = styled.button`
	background-color: transparent;
	color: var(--color-blue);
	font-size: 0.75rem;
	margin: 2% 0 7% 0;
	font-family: var(--font-nanum-bold);
`;

export const UserIntroductionInput = styled.textarea`
	width: 100%;
	margin: 0 0 4% 0;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;
`;

export const SaveProfileButton = styled(FormConfirmButton)`
	margin: 9% 0 5% 0;
`;

export const UserProfileImageButton = styled.button`
	border-radius: 50%;
	background-color: transparent;
`;
