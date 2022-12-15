import styled from 'styled-components';
import { FormConfirmButton } from 'components/shared/FormButtons/styled';

type StyledProps = {
	$empty: boolean;
};
export const UploadSchoolIdCardForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

export const SchoolIdCardUploadButton = styled.button`
	border: 0;
	background: transparent;
	text-decoration: underline;
	color: #848484;
	font-size: 0.875rem;
	font-family: var(--font-nanum-bold);
`;

export const SchoolIdCardDeleteButton = styled.button`
	font-size: 0.75rem;
	background-color: transparent;
	color: var(--color-dark-gray);
	text-decoration: underline;
	margin-left: auto;
	margin-bottom: 2%;
	font-family: var(--font-nanum-black);
`;

export const SchoolIdCardUploadBox = styled.div`
	width: 100%;
	${({ $empty }: StyledProps) => ($empty ? 'height: 200px;' : '')}
	border-style: dashed;
	border-width: 2px;
	border-color: #e5e5e5;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5% 7%;
`;

export const SubmitSchoolIdCardButton = styled(FormConfirmButton)`
	width: 100%;
	margin-top: 10%;
`;

export const ChangeSchoolIdCardButton = styled.button`
	background-color: transparent;
	width: 100%;
`;
