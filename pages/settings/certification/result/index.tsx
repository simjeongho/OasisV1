import SubmitOnGoing from 'assets/images/school-certification/ongoing.png';
import SubmitComplete from 'assets/images/school-certification/complete.png';
import { selectUser } from 'stores/store';
import { USER_UNIVERSITY_VERIFICATION } from 'constants/user';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import WithAuth from 'utils/HOC/withAuth';

export const CertificationResultContainer = styled.main`
	width: 100%;
	padding: 5% 5% 100% 5%;

	& > h2 {
		font-size: 1.3rem;
		margin: 0 0 12% 0;
		font-family: var(--font-nanum-bold);
	}
`;

export const CertificationResultBox = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	background: #eaf3ff;
	width: 100%;
	margin: auto;
	padding: 12% 10.5% 9% 10.5%;

	& > h3 {
		font-size: 1.125rem;
		font-family: var(--font-nanum-bold);
		margin: 15% 0 5% 0;
	}

	& > p {
		font-size: 0.875rem;
		margin: 0;
		line-height: 24px;
		text-align: center;
	}
`;

const CertificationResult = () => {
	const { universityVerify, universityName, universityMajor } = useSelector(selectUser);

	return (
		<CertificationResultContainer>
			<h2>학교 인증하기</h2>
			<CertificationResultBox aria-labelledby="settings_school_certification_label">
				{universityVerify !== USER_UNIVERSITY_VERIFICATION ? (
					<>
						<Image src={SubmitComplete} alt="" />
						<h3 id="settings_school_certification_label">학교 인증 완료</h3>
						<p>
							{universityName} {universityMajor}
						</p>
					</>
				) : (
					<>
						<Image src={SubmitOnGoing} alt="" />
						<h3 id="settings_school_certification_label">학교 인증 검토 중</h3>
						<p>
							등록해주신 학생증을 참고하여 인증 검토 중이에요
							<br />
							빠른 시일내로 알려 드릴게요
						</p>
					</>
				)}
			</CertificationResultBox>
		</CertificationResultContainer>
	);
};

export default WithAuth(CertificationResult, true);
