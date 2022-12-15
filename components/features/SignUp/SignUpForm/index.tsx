import {
	SignUpButton,
	SignUpFormCheckBoxWrapper,
	SignUpCancelButton,
	SignUpFormCheckBox,
	SignUpFormContainer,
	SignUpPolicyButton,
} from './styled';
import { AlertFailModal } from 'components/shared/AlertMessages/styled';
import useSignUpFormValidation from 'components/features/SignUp/SignUpForm/useSignUpFormValidation';
import FormItem from 'components/shared/FormItem';
import { useSelector } from 'react-redux';
import { selectSignUp } from 'stores/store';
import useInput from 'hooks/useInput';
import ArrowRightIcon from 'assets/images/signup/arrow_right_icon.svg';

const SignUpForm = () => {
	const {
		email: storedEmail,
		password: storedPassword,
		passwordConfirm: storedPasswordConfirm,
		name: storedName,
		privacy: storedPrivacy,
		terms: storedTerms,
		marketing: storedMarketing,
	} = useSelector(selectSignUp);

	const [email, handleEmail] = useInput(storedEmail);

	const [password, handlePassword] = useInput(storedPassword);

	const [passwordConfirm, handlePasswordConfirm] = useInput(storedPasswordConfirm);

	const [name, handleName] = useInput(storedName);

	const [privacy, handlePrivacy] = useInput(storedPrivacy, 'checkbox');

	const [terms, handleTerms] = useInput(storedTerms, 'checkbox');

	const [marketing, handleMarketing] = useInput(storedMarketing, 'checkbox');

	const [
		emailValidation,
		passwordValidation,
		passwordConfirmValidation,
		nameValidation,
		agreementValidation,
		handleSumbitSignUpForm,
	] = useSignUpFormValidation(email, password, passwordConfirm, name, privacy, terms, marketing);

	return (
		<>
			{!agreementValidation.valid && <AlertFailModal role="alert">{agreementValidation.message}</AlertFailModal>}
			<SignUpFormContainer onSubmit={handleSumbitSignUpForm}>
				<ul>
					<FormItem
						id="signup_email"
						label="이메일*"
						type="text"
						placeholder="사용 가능한 이메일을 입력해주세요"
						value={email}
						handleChange={handleEmail}
						isValid={emailValidation.valid}
						validationMessage={emailValidation.message}
						required
					/>

					<FormItem
						id="signup_password"
						label="비밀번호*"
						type="password"
						placeholder="8자 이상 영문/숫자 포함해서 입력해주세요"
						value={password}
						handleChange={handlePassword}
						isValid={passwordValidation.valid}
						validationMessage={passwordValidation.message}
						required
					/>

					<FormItem
						id="signup_password_confirm"
						label="비밀번호 확인*"
						type="password"
						placeholder="비밀번호를 다시 입력해주세요"
						value={passwordConfirm}
						handleChange={handlePasswordConfirm}
						isValid={passwordConfirmValidation.valid}
						validationMessage={passwordConfirmValidation.message}
						required
					/>

					<FormItem
						id="signup_name"
						label="이름*"
						type="text"
						placeholder="실명을 입력해주세요"
						value={name}
						handleChange={handleName}
						isValid={nameValidation.valid}
						validationMessage={nameValidation.message}
						required
					/>
				</ul>

				<ul>
					<SignUpFormCheckBoxWrapper>
						<SignUpFormCheckBox>
							<input
								type="checkbox"
								checked={privacy}
								onChange={handlePrivacy}
								aria-required="true"
								aria-checked={privacy}
							/>
							<span>[필수] 개인정보처리방침에 동의합니다</span>
						</SignUpFormCheckBox>
						<SignUpPolicyButton type="button">
							<ArrowRightIcon alt="개인 정보 처리 방침 상세 보기" />
						</SignUpPolicyButton>
					</SignUpFormCheckBoxWrapper>

					<SignUpFormCheckBoxWrapper>
						<SignUpFormCheckBox>
							<input type="checkbox" checked={terms} onChange={handleTerms} aria-required="true" aria-checked={terms} />
							<span>[필수] 이용약관에 동의합니다</span>
						</SignUpFormCheckBox>
						<SignUpPolicyButton type="button">
							<ArrowRightIcon alt="이용 약관 상세 보기" />
						</SignUpPolicyButton>
					</SignUpFormCheckBoxWrapper>

					<SignUpFormCheckBoxWrapper>
						<SignUpFormCheckBox>
							<input
								type="checkbox"
								checked={marketing}
								onChange={handleMarketing}
								aria-required="true"
								aria-checked={marketing}
							/>
							<span>[선택] 마케팅정보수신에 동의합니다</span>
						</SignUpFormCheckBox>
						<SignUpPolicyButton type="button">
							<ArrowRightIcon alt="마케팅 정보 수신 상세 보기" />
						</SignUpPolicyButton>
					</SignUpFormCheckBoxWrapper>
				</ul>

				<SignUpButton type="submit">회원가입</SignUpButton>
				<SignUpCancelButton href="/login">돌아가기</SignUpCancelButton>
			</SignUpFormContainer>
		</>
	);
};

export default SignUpForm;
