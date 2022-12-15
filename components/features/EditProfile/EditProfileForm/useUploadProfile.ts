import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from 'apis/User/user-service';
import { checkUserStart, responseErrorWarning, responseSuccessGuide, throwTokenError } from 'stores/slices/user-slice';
import { TOKEN_ERROR } from 'constants/errors';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from 'constants/api';
import { UserUploadFile } from 'types/upload';
import { selectUser } from 'stores/store';

const userService = new UserService();

const useUploadProfile = (
	userIntroduction: string,
	setUserIntroduction: Dispatch<SetStateAction<string>>,
	profileImage: UserUploadFile | null,
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const userSelector = useSelector(selectUser);
	const { profileDescription } = userSelector;

	useEffect(() => {
		setUserIntroduction(profileDescription);
	}, [profileDescription]);

	const dispatch = useDispatch();

	const Router = useRouter();

	const handleUploadProfile = useCallback(async () => {
		const data = {
			profileDescription: userIntroduction,
			profileFile: profileImage?.file,
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await userService.uploadProfile(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				setIsEdited(false);

				dispatch(checkUserStart());
				dispatch(responseSuccessGuide('프로필을 변경했어요!'));

				Router.push('/mypage');
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	}, [Router, dispatch, profileImage?.file, setIsEdited, userIntroduction]);

	return handleUploadProfile;
};

export default useUploadProfile;
