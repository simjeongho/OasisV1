import styled from 'styled-components';

const EditAlertConatiner = styled.div`
	width: 100%;
	padding: 9.5% 7.5% 7.5% 7.5%;

	& > p {
		color: var(--color-darker-gray);
		&:nth-child(1) {
			font-size: 0.875rem;
			margin: 0 0 5% 0;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.75rem;
			margin: 0 0 10% 0;
		}
	}
`;

const LongAlertButtonList = styled.ul`
	display: flex;
	align-items: center;
	position: relative;

	& > li {
		&:nth-child(1) {
			& > button {
				color: var(--color-blue);
			}
		}

		&:nth-child(2) {
			& > button {
				color: var(--color-darker-gray);
			}
		}

		&:nth-child(3) {
			position: absolute;
			right: 0;
			& > button {
				color: var(--color-lighter-gray);
			}
		}

		& > button {
			background-color: transparent;
			font-size: 0.875rem;
			font-family: var(--font-nanum-bold);
		}
	}
`;

type Props = {
	setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
	setLeavePage: React.Dispatch<React.SetStateAction<boolean>>;
	setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCancelAlertModal = ({ setShowAlertModal, setLeavePage, setIsFormSubmitted }: Props) => {
	return (
		<EditAlertConatiner
			role="alertdialog"
			aria-labelledby="cancel_alert_modal_label"
			aria-describedby="cancel_alert_modal_description"
			aria-modal="true"
		>
			<p id="cancel_alert_modal_label">아직 프로필을 저장하기 않았어요</p>
			<p id="cancel_alert_modal_description">나의 아뜰리에 페이지로 돌아가기 전에 내용을 저장할까요?</p>
			<LongAlertButtonList>
				<li>
					<button onClick={() => setIsFormSubmitted(true)}>저장하기</button>
				</li>
				<li>
					<button onClick={() => setLeavePage(true)}>저장 안 함</button>
				</li>
				<li>
					<button onClick={() => setShowAlertModal(false)}>취소</button>
				</li>
			</LongAlertButtonList>
		</EditAlertConatiner>
	);
};

export default EditCancelAlertModal;
