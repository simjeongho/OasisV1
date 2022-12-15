import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from 'apis/Auth/auth-service';
import { selectSignUp } from 'stores/store';
import { initSignUpForm } from 'stores/slices/signup-slice';
import { useDispatch, useSelector } from 'react-redux';
import { responseErrorWarning, userLogin } from 'stores/slices/user-slice';
import { RESPONSE_STATUS_200, RESPONSE_STATUS_201, RESPONSE_STATUS_400 } from 'constants/api';

const authService = new AuthService();

type ReturnType = [() => void, (e: React.FormEvent<HTMLFormElement>) => void];

const useCompleteSignUpForm = (
	verificaitonCode: string,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
): ReturnType => {
	const { email, password, name, privacy, terms, marketing } = useSelector(selectSignUp);

	const dispatch = useDispatch();

	const Router = useRouter();

	const login = async () => {
		const data = {
			emailId: email,
			password,
		};

		try {
			const statusCode = await authService.login(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				dispatch(userLogin());

				Router.push(
					{
						pathname: '/',
						query: {
							signup_success: 'true',
						},
					},
					'/',
				);
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || '다시 로그인 해주세요.'));
		}
	};

	const signup = async () => {
		const requestData = {
			emailId: email,
			password,
			userName: name,
			termsOfService: privacy,
			privacyOfPolicy: terms,
			marketingSub: marketing,
		};

		try {
			const { statusCode, data } = await authService.signup(requestData);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(data?.message || '회원가입에 실패했습니다.'));
				Router.push('/signup');
				return;
			}

			login();
		} catch (error) {
			dispatch(responseErrorWarning('회원가입에 실패했습니다.'));
			Router.push('/signup');
		}
	};

	const [verificationId, setVerificationId] = useState('');

	const sendEmailVerificationCode = async () => {
		try {
			const { statusCode, uuid } = await authService.sendEmailVerificationCode(email);

			if (statusCode === RESPONSE_STATUS_200) {
				setVerificationId(uuid);
			}
		} catch (error) {
			dispatch(responseErrorWarning('인증번호를 다시 요청해주세요.'));
		}
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsValid(verificaitonCode.trim() !== '');

		if (verificaitonCode.trim() === '') return;

		try {
			const statusCode = await authService.checkVerificationCode(verificationId, verificaitonCode);

			if (statusCode === RESPONSE_STATUS_200) {
				signup();
				dispatch(initSignUpForm());
			} else {
				dispatch(responseErrorWarning('인증번호가 틀렸습니다.'));
			}
		} catch (error) {
			dispatch(responseErrorWarning('인증번호가 틀렸습니다.'));
		}
	};

	return [sendEmailVerificationCode, handleSubmitForm];
};

export default useCompleteSignUpForm;
