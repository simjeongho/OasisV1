import useInput from 'hooks/useInput';
import useLoginForm from 'components/features/Login/LoginForm/useLoginForm';
import FormItem from 'components/shared/FormItem';
import { LoginButton, LoginFormContainer, MoveToSignUpButton } from './styled';

const LoginForm = () => {
	const [email, handleEmail] = useInput('');
	const [password, handlePassword] = useInput('');

	const [emailValidation, passwordlValidation, handleSubmitLoginForm] = useLoginForm(email, password);

	return (
		<LoginFormContainer onSubmit={handleSubmitLoginForm}>
			<ul>
				<FormItem
					id="login_email"
					label="이메일"
					type="text"
					placeholder="이메일을 입력해주세요"
					value={email}
					handleChange={handleEmail}
					isValid={emailValidation}
					validationMessage="이메일을 입력해주세요"
					required
				/>

				<FormItem
					id="login_password"
					label="비밀번호"
					type="password"
					placeholder="비밀번호를 입력해주세요"
					value={password}
					handleChange={handlePassword}
					isValid={passwordlValidation}
					validationMessage="비밀번호를 입력해주세요"
					required
				/>
			</ul>

			<LoginButton type="submit">로그인</LoginButton>
			<MoveToSignUpButton href="/signup">회원가입</MoveToSignUpButton>
		</LoginFormContainer>
	);
};

export default LoginForm;
