import { useCallback, useState } from 'react';
import PasswordInitializationForm from 'components/features/InquiryAccount/PasswordInitializationForm';
import styled from 'styled-components';
import ConfirmModal from 'components/shared/ConfirmModal';
import { useRouter } from 'next/router';
import WithAuth from 'utils/HOC/withAuth';

const AccountInquiryContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5% 95% 7.5%;

	& > h3 {
		font-size: 1.125rem;
		margin: 0 0 10.5% 0;
	}
`;

const AccountInquiryHeader = styled.header`
	width: 100%;
	margin-bottom: 10.5%;

	& > h2 {
		margin: 0;
		font-size: 1.5rem;
		font-family: var(--font-nanum-bold);
	}
`;

const AccoutInquiry = () => {
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

	const Router = useRouter();

	const handleClickConfirmButton = useCallback(() => {
		Router.push('/login');
	}, [Router]);

	const showConfirmModal = useCallback(() => {
		setIsConfirmModalVisible(true);
	}, []);

	return (
		<>
			<AccountInquiryContainer>
				<AccountInquiryHeader>
					<h2>비밀번호 초기화</h2>
				</AccountInquiryHeader>
				<h3>회원가입하신 이메일과 이름을 입력해주세요</h3>

				<PasswordInitializationForm showConfirmModal={showConfirmModal} />
			</AccountInquiryContainer>
			{isConfirmModalVisible && (
				<ConfirmModal
					content={`%이메일주소%로
					새로운 비밀번호를 보내드렸어요
					메일함을 확인해주세요`}
					onConfirm={handleClickConfirmButton}
					dark
				/>
			)}
		</>
	);
};

export default WithAuth(AccoutInquiry);
