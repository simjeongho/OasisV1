import { useState } from 'react';
import UploadWorkForm from 'components/features/UploadWork/UploadWorkForm';
import useChangeHeader from 'hooks/useChangeHeader';
import WithAuth from 'utils/HOC/withAuth';

const UploadWork = () => {
	useChangeHeader('sub', true);

	const [showAlertModal, setShowAlertModal] = useState(false);
	const [isEdited, setIsEdited] = useState(false);

	return <UploadWorkForm setIsEdited={setIsEdited} />;
};

export default WithAuth(UploadWork, true);
