import { useState } from 'react';
import EditProfileForm from 'components/features/EditProfile/EditProfileForm';
import { MyPageContainer } from '..';
import WithAuth from 'utils/HOC/withAuth';

const EditProfile = () => {
	const [isEdited, setIsEdited] = useState(false);

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	return (
		<MyPageContainer>
			<EditProfileForm setIsEdited={setIsEdited} isFormSubmitted={isFormSubmitted} />
		</MyPageContainer>
	);
};

export default WithAuth(EditProfile, true);
