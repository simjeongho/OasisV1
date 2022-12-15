import { useRef, useState, RefObject, ChangeEvent, useEffect, useCallback } from 'react';
import { WorkImage } from 'types/work';
import { imageTypeFormatter } from 'utils/formatter';

type ReturnType = [
	WorkImage[],
	RefObject<HTMLInputElement>,
	(e: ChangeEvent<HTMLInputElement>) => void,
	number | null,
	(id: number) => void,
	() => void,
	() => void,
	RefObject<HTMLInputElement>,
	(e: ChangeEvent<HTMLInputElement>) => void,
	(idx: number) => void,
];

const useUploadWorkImages = (): ReturnType => {
	const [workImages, setWorkImages] = useState<WorkImage[]>([]);

	const workImagesRef = useRef<HTMLInputElement>(null);

	const uploadWorkImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			Object.values(fileList).forEach((file) => {
				const url = URL.createObjectURL(file);

				const newWorkImage = {
					id: Math.floor(Math.random() * 100000),
					file,
					thumbnail: url,
					type: imageTypeFormatter(file.type),
				};

				setWorkImages((prev) => {
					return [...prev, newWorkImage];
				});
			});

			if (workImagesRef.current) workImagesRef.current.value = '';
		}
	}, []);

	const changeImageRef = useRef<HTMLInputElement>(null);

	const [workImageToBeChanged, setWorkImageToBeChanged] = useState<number | null>(null);

	const clickChangeImageButton = useCallback((idx: number) => {
		setWorkImageToBeChanged(idx);
	}, []);

	const changeUploadedWorkImage = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const fileList = e.target.files;

			if (fileList && fileList[0] && typeof workImageToBeChanged === 'number') {
				const url = URL.createObjectURL(fileList[0]);

				const uploadedImage = {
					id: Math.floor(Math.random() * 100000),
					file: fileList[0],
					thumbnail: url,
					type: imageTypeFormatter(fileList[0].type),
				};

				const newWorkImages = [...workImages];

				newWorkImages.splice(workImageToBeChanged, 1, uploadedImage);

				setWorkImages(newWorkImages);

				if (changeImageRef.current) changeImageRef.current.value = '';
			}
		},
		[workImageToBeChanged, workImages],
	);

	useEffect(() => {
		return () => {
			workImages.forEach((img) => {
				URL.revokeObjectURL(img.thumbnail);
			});
		};
	}, []);

	const [workImageToBeDeleted, setWorkImageToBeDeleted] = useState<number | null>(null);

	const clickRemoveButton = useCallback((id: number) => {
		setWorkImageToBeDeleted(id);
	}, []);

	const deleteClickedImage = useCallback(() => {
		setWorkImages((prev) => prev.filter((img) => img.id !== workImageToBeDeleted));
		setWorkImageToBeDeleted(null);
	}, [workImageToBeDeleted]);

	const cancelToRemoveImages = useCallback(() => {
		setWorkImageToBeDeleted(null);
	}, []);

	return [
		workImages,
		workImagesRef,
		uploadWorkImages,
		workImageToBeDeleted,
		clickRemoveButton,
		deleteClickedImage,
		cancelToRemoveImages,
		changeImageRef,
		changeUploadedWorkImage,
		clickChangeImageButton,
	];
};

export default useUploadWorkImages;
