import { responseSuccessGuide, responseErrorWarning } from 'stores/slices/user-slice';
import { useDispatch } from 'react-redux';
import { RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from './../../../../constants/api';
import UserService from 'apis/User/user-service';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { BASIC_ERROR_MESSAGE } from 'constants/api';

type ReturnType = [boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];

const userService = new UserService();

const useInitPassword = (email: string, name: string, showConfirmModal: () => void): ReturnType => {
	const [emailValidation, setEmailValidation] = useState(true);
	const [nameValidation, setNameValidation] = useState(true);

	const dispatch = useDispatch();
	const checkAllInputsValidation = useCallback(() => {
		setEmailValidation(email.trim() !== '');
		setNameValidation(name.trim() !== '');

		return email.trim() !== '' && name.trim() !== '';
	}, [email, name]);

	const Router = useRouter();
	const resetPassword = useCallback(async () => {
		const data = {
			emailId: email,
			userName: name,
		};

		try {
			const status = await userService.resetPassword(data);
			if (status === RESPONSE_STATUS_200) {
				dispatch(responseSuccessGuide('비밀번호를 초기화했어요!'));
				Router.push('/login');
			}

			if (status >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
				return;
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || BASIC_ERROR_MESSAGE));
		}
	}, [Router, dispatch, email, name]);

	const handleSubmitInitForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const validationCheckResult = checkAllInputsValidation();

			if (!validationCheckResult) return;
			resetPassword();
			showConfirmModal();
		},
		[checkAllInputsValidation, showConfirmModal],
	);

	return [emailValidation, nameValidation, handleSubmitInitForm];
};

export default useInitPassword;
