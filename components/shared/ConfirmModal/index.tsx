import styled from 'styled-components';
import Modal from 'components/shared/Modal';

const ConfirmModalConatiner = styled.dialog`
	width: 100%;
	padding: 9.5% 8% 7.5% 8%;
	display: flex;
	flex-direction: column;
	border: 0.5px solid var(--color-dark-gray);
	border-radius: 16px;

	& > pre {
		color: var(--color-darker-gray);
		font-size: 0.875rem;
		margin: 0 0 10% 0;
		white-space: pre-line;
	}
`;

const ConfirmButton = styled.button`
	background-color: transparent;
	color: var(--color-blue);
	font-size: 0.875rem;
`;

type Props = {
	content: string;
	onConfirm: () => void;
	dark?: boolean;
};

const ConfirmModal = ({ content, onConfirm, dark = false }: Props) => {
	return (
		<Modal dark={dark}>
			<ConfirmModalConatiner aria-modal="true" aria-labelledby="confirm_modal_label">
				<pre id="confirm_modal_label">{content}</pre>
				<ConfirmButton type="button" onClick={onConfirm}>
					확인
				</ConfirmButton>
			</ConfirmModalConatiner>
		</Modal>
	);
};

export default ConfirmModal;
