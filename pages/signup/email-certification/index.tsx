import { useCallback, useState } from 'react';
import EmailCertificationForm from 'components/features/EmailCertification/CertificationForm';
import { RESEND_TIME_OUT } from 'constants/alert';
import ConfirmModal from 'components/shared/ConfirmModal';
import { GetServerSideProps } from 'next';
import { SignUpContainer } from '..';
import WithAuth from 'utils/HOC/withAuth';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;

	if (!query?.from_signup) {
		return {
			redirect: {
				destination: '/signup',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

const EmailCertification = () => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const handleClickConfirmButton = useCallback(() => {
		setShowAlertModal(false);
	}, []);

	return (
		<SignUpContainer>
			<EmailCertificationForm setShowAlertModal={setShowAlertModal} />
			{showAlertModal && (
				<ConfirmModal
					content={`${RESEND_TIME_OUT / 1000}초 후 다시 받기 버튼을 눌러주세요`}
					onConfirm={handleClickConfirmButton}
					dark
				/>
			)}
		</SignUpContainer>
	);
};

export default WithAuth(EmailCertification);
