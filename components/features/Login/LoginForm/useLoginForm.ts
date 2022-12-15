import { useState, useCallback } from 'react';
import AuthService from 'apis/Auth/auth-service';
import { useDispatch } from 'react-redux';
import { responseErrorWarning, userLogin } from 'stores/slices/user-slice';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from 'constants/api';
import { useRouter } from 'next/router';

const authService = new AuthService();

type ReturnType = [boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];

const useLoginForm = (email: string, password: string): ReturnType => {
	const [emailValidation, setEmailValidation] = useState(true);

	const [passwordlValidation, setPasswordValidation] = useState(true);

	const checkAllInputsValidation = useCallback(() => {
		setEmailValidation(email.trim() !== '');
		setPasswordValidation(password.trim() !== '');

		return email.trim() !== '' && password.trim() !== '';
	}, [email, password]);

	const dispatch = useDispatch();

	const Router = useRouter();

	const login = useCallback(async () => {
		const data = {
			emailId: email,
			password: password,
		};

		try {
			const statusCode = await authService.login(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				dispatch(userLogin());
				Router.push(
					{
						pathname: '/',
						query: {
							login_success: 'true',
						},
					},
					'/',
				);
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || BASIC_ERROR_MESSAGE));
		}
	}, [Router, dispatch, email, password]);

	const handleSubmitLoginForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const validationCheckResult = checkAllInputsValidation();

			if (!validationCheckResult) return;

			login();
		},
		[checkAllInputsValidation, login],
	);

	return [emailValidation, passwordlValidation, handleSubmitLoginForm];
};

export default useLoginForm;
