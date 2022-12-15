import Modal from 'components/shared/Modal';
import { AlertButtonList, AlertModalConatiner } from './styled';

type Props = {
	content: string;
	subContent?: string;
	confirmName: string;
	cancelName: string;
	onConfirm: () => void;
	onCancel: () => void;
	reverse?: boolean;
};

const AlertModal = ({ content, subContent, confirmName, cancelName, onConfirm, onCancel, reverse = false }: Props) => {
	return (
		<Modal>
			<AlertModalConatiner
				role="alertdialog"
				aria-labelledby="alert_modal_label"
				aria-describedby="alert_modal_description"
				aria-modal="true"
			>
				<p id="alert_modal_label">{content}</p>
				{subContent && <p id="alert_modal_description">{subContent}</p>}
				<AlertButtonList $reverse={reverse}>
					<li>
						<button type="button" onClick={onCancel}>
							{cancelName}
						</button>
					</li>
					<li>
						<button type="button" onClick={onConfirm}>
							{confirmName}
						</button>
					</li>
				</AlertButtonList>
			</AlertModalConatiner>
		</Modal>
	);
};

export default AlertModal;
