import SchoolCertificationForm from 'components/features/SchoolCertification/SchoolCertificationForm';
import ExampleschoolIdCard from 'assets/images/school-certification/school_id_example.png';
import styled from 'styled-components';
import NextResponsiveImage from 'components/shared/ResponsiveImage';
import WithAuth from 'utils/HOC/withAuth';

export const SchoolCertificationContainer = styled.main`
	width: 100%;
	padding: 5%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100%;
`;

export const SchoolCertificationHeader = styled.header`
	width: 100%;
	margin-bottom: 6%;

	& > h2 {
		font-size: 1.3rem;
		margin: 0 0 5% 0;
		font-family: var(--font-nanum-bold);
	}

	& > p {
		font-size: 0.875rem;
		color: #848484;
		margin: 0;
	}
`;
export const SchoolCertificationExampleImage = styled.div`
	width: 50%;
	height: auto;
	margin-bottom: 8%;
	background-color: transparent;
`;

const SchoolCertification = () => {
	return (
		<SchoolCertificationContainer>
			<SchoolCertificationHeader>
				<h2>학교 인증하기</h2>
				<p>아래와 같이 가로로 찍은 학생증 사진을 업로드해주세요</p>
			</SchoolCertificationHeader>

			<SchoolCertificationExampleImage>
				<NextResponsiveImage src={ExampleschoolIdCard} alt="학생증 예시 - 앞면이 전부 보이는 이미지" />
			</SchoolCertificationExampleImage>

			<SchoolCertificationForm />
		</SchoolCertificationContainer>
	);
};

export default WithAuth(SchoolCertification, true);
