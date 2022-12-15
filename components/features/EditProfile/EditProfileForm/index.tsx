import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import UserProfileBlank from 'assets/images/mypage/user_profile_blank.svg';
import useInput from 'hooks/useInput';
import {
	ChangeImageButton,
	UserIntroductionInput,
	EditProfileContainer,
	UploadedProfileImage,
	SaveProfileButton,
	UserProfileImageButton,
} from './styled';
import useTextLimit from 'hooks/useTextLimit';
import { FormCancelButton } from 'components/shared/FormButtons/styled';
import { CountLetters } from 'components/shared/CountLetters/styled';
import { InvisibleFileInput } from 'components/shared/InvisibleFileInput/styled';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/store';
import { UserUploadFile } from 'types/upload';
import { INTRODUCTION_LETTERS_LIMIT } from 'constants/letters';
import useUploadProfile from 'components/features/EditProfile/EditProfileForm/useUploadProfile';
import useUploadImage from 'hooks/useUploadImage';

type Props = {
	setIsEdited: Dispatch<SetStateAction<boolean>>;
	isFormSubmitted: boolean;
};

const EditProfileForm = ({ setIsEdited, isFormSubmitted }: Props) => {
	const userSelector = useSelector(selectUser);
	const { profileImgPath, profileDescription } = userSelector;

	const [profileImage, setProfileImage] = useState<UserUploadFile | null>(null);

	const [userIntroduction, handleUserIntroduction, setUserIntroduction] = useInput<string>(profileDescription || '');

	const numberOfIntroduction = useTextLimit(userIntroduction, setUserIntroduction, INTRODUCTION_LETTERS_LIMIT);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClickFileInput = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		setIsEdited((profileImage !== null || numberOfIntroduction > 0) && profileDescription !== userIntroduction);
	}, [profileImage, profileDescription, numberOfIntroduction]);

	const uploadProfileImage = useUploadImage(profileImage, setProfileImage, fileInputRef);

	const handleUploadProfile = useUploadProfile(userIntroduction, setUserIntroduction, profileImage, setIsEdited);

	const showProfileImage = useMemo(() => {
		if (!profileImage && !profileImgPath) {
			return (
				<UserProfileImageButton type="button" onClick={handleClickFileInput}>
					<UserProfileBlank alt="프로필 사진 변경" />
				</UserProfileImageButton>
			);
		}
		return (
			<UserProfileImageButton type="button" onClick={handleClickFileInput}>
				<UploadedProfileImage
					src={profileImage?.thumbnail || profileImgPath}
					alt="프로필 사진 변경"
					width={100}
					height={100}
				/>
			</UserProfileImageButton>
		);
	}, [profileImage, profileImgPath]);

	useEffect(() => {
		if (isFormSubmitted) {
			handleUploadProfile();
		}
	}, [isFormSubmitted]);

	const submitProfileEditForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleUploadProfile();
	};

	return (
		<EditProfileContainer onSubmit={submitProfileEditForm}>
			<h2>프로필 편집</h2>
			{showProfileImage}
			<InvisibleFileInput
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				ref={fileInputRef}
				onChange={uploadProfileImage}
			/>
			<ChangeImageButton type="button" onClick={handleClickFileInput}>
				프로필 사진 변경
			</ChangeImageButton>

			<label htmlFor="edit_profile_introduction" hidden>
				프로필 소개 변경
			</label>
			<CountLetters>
				{numberOfIntroduction} / {INTRODUCTION_LETTERS_LIMIT}자
			</CountLetters>
			<UserIntroductionInput
				id="edit_profile_introduction"
				onChange={handleUserIntroduction}
				value={userIntroduction}
				placeholder={userIntroduction || '여러분을 가장 잘 나타낼 수 있는 소개를 작성해보세요'}
			/>

			<SaveProfileButton type="submit">저장하기</SaveProfileButton>
			<FormCancelButton href="/mypage">돌아가기</FormCancelButton>
		</EditProfileContainer>
	);
};

export default EditProfileForm;
