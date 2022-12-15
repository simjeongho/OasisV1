import { ChangeEvent, RefObject, SetStateAction, useEffect } from 'react';
import { UserUploadFile } from 'types/upload';
import { imageTypeFormatter } from 'utils/formatter';

const useUploadImage = (
	image: UserUploadFile | null,
	setImage: (value: SetStateAction<UserUploadFile | null>) => void,
	fileInputRef: RefObject<HTMLInputElement>,
) => {
	const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);

			setImage({
				file: fileList[0],
				thumbnail: url,
				type: imageTypeFormatter(fileList[0].type),
			});

			if (fileInputRef.current) fileInputRef.current.value = '';
		}
	};

	useEffect(() => {
		return () => {
			if (image) {
				URL.revokeObjectURL(image.thumbnail);
			}
		};
	}, []);

	return uploadImage;
};

export default useUploadImage;
