import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { saveSignUpForm } from 'stores/slices/signup-slice';

type ReturnType = [
	InputValidation,
	InputValidation,
	InputValidation,
	InputValidation,
	InputValidation,
	(e: React.FormEvent<HTMLFormElement>) => void,
];

type InputValidation = {
	valid: boolean;
	message: string;
};

const useSignUpFormValidation = (
	email: string,
	password: string,
	passwordConfirm: string,
	name: string,
	privacy: boolean,
	terms: boolean,
	marketing: boolean,
): ReturnType => {
	const [emailValidation, setEmailValidation] = useState<InputValidation>({
		valid: true,
		message: '',
	});

	const checkEmailValidation = () => {
		if (!email.trim()) {
			setEmailValidation({
				valid: false,
				message: '이메일을 입력해주세요',
			});
			return false;
		}

		const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		if (!regExp.test(email)) {
			setEmailValidation({
				valid: false,
				message: '사용 가능한 이메일을 입력해주세요',
			});
			return false;
		}

		setEmailValidation({
			valid: true,
			message: '',
		});
		return true;
	};

	const [passwordValidation, setPasswordValidation] = useState<InputValidation>({
		valid: true,
		message: '',
	});

	const checkPasswordValidation = () => {
		if (!password.trim()) {
			setPasswordValidation({
				valid: false,
				message: '비밀번호를 입력해주세요',
			});
			return false;
		}

		const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

		if (!regExp.test(password)) {
			setPasswordValidation({
				valid: false,
				message: '8자 이상 영문/숫자 조합으로 입력해주세요',
			});
			return false;
		}

		setPasswordValidation({
			valid: true,
			message: '',
		});
		return true;
	};

	const [passwordConfirmValidation, setPasswordConfirmValidation] = useState<InputValidation>({
		valid: true,
		message: '',
	});

	const checkPasswordConfirmValidation = () => {
		if (!passwordConfirm || password !== passwordConfirm) {
			setPasswordConfirmValidation({
				valid: false,
				message: '비밀번호를 다시 입력해주세요',
			});
			return false;
		}

		setPasswordConfirmValidation({
			valid: true,
			message: '',
		});
		return true;
	};

	const [nameValidation, setNameValidation] = useState<InputValidation>({
		valid: true,
		message: '',
	});

	const checkNameValidation = () => {
		if (!name.trim()) {
			setNameValidation({
				valid: false,
				message: '이름을 입력해주세요',
			});
			return false;
		}

		const regExp = /^[가-힣]+$/;

		if (!regExp.test(name)) {
			setNameValidation({
				valid: false,
				message: '이름은 한글만 가능해요',
			});
			return false;
		}

		setNameValidation({
			valid: true,
			message: '',
		});
		return true;
	};

	const [agreementValidation, setAgreementValidation] = useState<InputValidation>({
		valid: true,
		message: '',
	});

	const checkAgreementValidation = () => {
		if (!privacy || !terms) {
			setAgreementValidation({
				valid: false,
				message: '필수 약관에 동의해주세요',
			});
			return false;
		}

		setAgreementValidation({
			valid: true,
			message: '',
		});
		return true;
	};

	const checkAllInputsValidation = () => {
		const isEmailValid = checkEmailValidation();
		const isPasswordlValid = checkPasswordValidation();
		const isPasswordConfirmValid = checkPasswordConfirmValidation();
		const isNameValid = checkNameValidation();
		const isAgreementValid = checkAgreementValidation();

		return isEmailValid && isPasswordlValid && isPasswordConfirmValid && isNameValid && isAgreementValid;
	};

	const Router = useRouter();
	const dispatch = useDispatch();

	const handleSumbitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!checkAllInputsValidation()) return;

		dispatch(
			saveSignUpForm({
				email,
				password,
				passwordConfirm,
				name,
				privacy,
				terms,
				marketing,
			}),
		);

		Router.push(
			{
				pathname: '/signup/email-certification',
				query: {
					from_signup: 'true',
				},
			},
			'/signup/email-certification',
		);
	};

	return [
		emailValidation,
		passwordValidation,
		passwordConfirmValidation,
		nameValidation,
		agreementValidation,
		handleSumbitSignUpForm,
	];
};

export default useSignUpFormValidation;
