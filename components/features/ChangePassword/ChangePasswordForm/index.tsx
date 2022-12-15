import styled from 'styled-components';
import { FormConfirmButton } from 'components/shared/FormButtons/styled';
import FormItem from 'components/shared/FormItem';
import useInput from 'hooks/useInput';
import useChangePassword from 'components/features/ChangePassword/ChangePasswordForm/useChangePassword';

const ChangePasswordFormContainer = styled.form`
	width: 100%;
	padding: 0 6%;
`;

const ChangeButton = styled(FormConfirmButton)`
	width: 100%;
`;

const ChangePasswordForm = () => {
	const [curPassword, handleCurPassword] = useInput('');

	const [newPassword, handleNewPassword] = useInput('');

	const [newPasswordConfirm, handleNewPasswordConfirm] = useInput('');

	const [curPasswordValidation, newPasswordValidation, newPasswordConfirmValidation, handleSubmitChangePasswordForm] =
		useChangePassword(curPassword, newPassword, newPasswordConfirm);

	return (
		<ChangePasswordFormContainer onSubmit={handleSubmitChangePasswordForm}>
			<ul>
				<FormItem
					id="change_pw_cur_password"
					label="현재 비밀번호"
					type="password"
					placeholder="현재 비밀번호를 입력해주세요"
					value={curPassword}
					handleChange={handleCurPassword}
					isValid={curPasswordValidation}
					validationMessage="비밀번호를 띄어쓰기 없이 입력해주세요"
					required
				/>

				<FormItem
					id="change_pw_new_password"
					label="새 비밀번호"
					type="password"
					placeholder="새 비밀번호를 입력해주세요"
					value={newPassword}
					handleChange={handleNewPassword}
					isValid={newPasswordValidation}
					validationMessage="8자 이상 영문/숫자 조합으로 입력해주세요"
					required
				/>

				<FormItem
					id="change_pw_new_password_confirm"
					label="새 비밀번호 확인"
					type="password"
					placeholder="새 비밀번호를 다시 입력해주세요"
					value={newPasswordConfirm}
					handleChange={handleNewPasswordConfirm}
					isValid={newPasswordConfirmValidation}
					validationMessage="비밀번호를 한 번 더 입력해주세요"
					required
				/>
			</ul>

			<ChangeButton type="submit">비밀번호 변경</ChangeButton>
		</ChangePasswordFormContainer>
	);
};

export default ChangePasswordForm;
