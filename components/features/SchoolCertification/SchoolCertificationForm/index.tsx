import { useState, useRef } from 'react';
import { UserUploadFile } from 'types/upload';
import {
	UploadSchoolIdCardForm,
	SchoolIdCardUploadButton,
	SchoolIdCardUploadBox,
	SubmitSchoolIdCardButton,
	SchoolIdCardDeleteButton,
	ChangeSchoolIdCardButton,
} from './styled';
import { InvisibleFileInput } from 'components/shared/InvisibleFileInput/styled';
import { AlertFailModal } from 'components/shared/AlertMessages/styled';
import useSchoolCertification from 'components/features/SchoolCertification/SchoolCertificationForm/useSchoolCertification';
import NextResponsiveImage from 'components/shared/ResponsiveImage';
import useUploadImage from 'hooks/useUploadImage';

const SchoolCertificationForm = () => {
	const [studentIdCardImage, setStudentIdCardImage] = useState<UserUploadFile | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const uploadStudentIdCard = useUploadImage(studentIdCardImage, setStudentIdCardImage, fileInputRef);

	const handleSubmitSchoolIdForm = useSchoolCertification(studentIdCardImage, setIsFormSubmitted);

	return (
		<>
			{!studentIdCardImage && isFormSubmitted && (
				<AlertFailModal id="school_id_card_error_message" role="alert">
					학생증을 업로드 해주세요
				</AlertFailModal>
			)}
			<UploadSchoolIdCardForm onSubmit={handleSubmitSchoolIdForm}>
				{studentIdCardImage && (
					<SchoolIdCardDeleteButton type="button" onClick={() => setStudentIdCardImage(null)}>
						삭제하기
					</SchoolIdCardDeleteButton>
				)}

				<label htmlFor="school_id_card_input" hidden>
					학생증 업로드 인풋
				</label>
				<InvisibleFileInput
					id="school_id_card_input"
					type="file"
					accept="image/jpg, image/jpeg, image/png"
					ref={fileInputRef}
					onChange={uploadStudentIdCard}
					aria-required="true"
					aria-invalid={!studentIdCardImage && isFormSubmitted}
					aria-errormessage="school_id_card_error_message"
				/>

				<SchoolIdCardUploadBox $empty={studentIdCardImage === null}>
					{studentIdCardImage ? (
						<ChangeSchoolIdCardButton type="button" onClick={() => fileInputRef.current?.click()}>
							<NextResponsiveImage src={studentIdCardImage.thumbnail} alt="업로드 한 학생증 이미지 변경" />
						</ChangeSchoolIdCardButton>
					) : (
						<SchoolIdCardUploadButton type="button" onClick={() => fileInputRef.current?.click()}>
							학생증 업로드
						</SchoolIdCardUploadButton>
					)}
				</SchoolIdCardUploadBox>

				<SubmitSchoolIdCardButton type="submit">저장하기</SubmitSchoolIdCardButton>
			</UploadSchoolIdCardForm>
		</>
	);
};

export default SchoolCertificationForm;
