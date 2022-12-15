import { Dispatch, SetStateAction, FormEvent, useEffect, useState } from 'react';
import WorkService from 'apis/Work/work-service';
import { TOKEN_ERROR } from 'constants/errors';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_201, RESPONSE_STATUS_400 } from 'constants/api';
import { responseErrorWarning, throwTokenError } from 'stores/slices/user-slice';
import { useDispatch } from 'react-redux';
import { CommercialCopyright, ModifyCopyright, WorkImage } from 'types/work';
import { useRouter } from 'next/router';

const workService = new WorkService();

type BlankUploadFormInputs = {
	selectedCategory: boolean;
	title: boolean;
	description: boolean;
	workImages: boolean;
	tags: boolean;
	copyright: boolean;
};

type UploadFormInputs = {
	selectedCategory: string;
	title: string;
	description: string;
	workImages: WorkImage[];
	tags: string;
	collaborators: string;
	copyright: string;
	commercialCopyright: CommercialCopyright;
	modifyCopyright: ModifyCopyright;
};

type ReturnType = [BlankUploadFormInputs, boolean, (e: FormEvent<HTMLFormElement>) => Promise<void>];

const useUploadWorkForm = (
	{
		selectedCategory,
		title,
		description,
		workImages,
		tags,
		collaborators,
		copyright,
		commercialCopyright,
		modifyCopyright,
	}: UploadFormInputs,
	setIsEdited: Dispatch<SetStateAction<boolean>>,
): ReturnType => {
	const [blankInputs, setBlankInputs] = useState<BlankUploadFormInputs>({
		selectedCategory: false,
		title: false,
		description: false,
		workImages: false,
		tags: false,
		copyright: false,
	});

	const findBlanklInputs = () => {
		setBlankInputs({
			selectedCategory: selectedCategory === '',
			title: title === '',
			description: description === '',
			workImages: workImages.length === 0,
			tags: tags === '',
			copyright: copyright === '',
		});

		return (
			selectedCategory === '' ||
			title === '' ||
			description === '' ||
			workImages.length === 0 ||
			tags === '' ||
			copyright === ''
		);
	};

	useEffect(() => {
		setIsEdited(
			selectedCategory !== '' ||
				title !== '' ||
				description !== '' ||
				workImages.length > 0 ||
				tags !== '' ||
				copyright !== '',
		);
	}, [selectedCategory, title, description, workImages, tags, copyright]);

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const dispatch = useDispatch();

	const Router = useRouter();

	const submitUploadWorkForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsFormSubmitted(true);

		const isThereBlankInput = findBlanklInputs();

		if (isThereBlankInput) return;

		try {
			const data = {
				title,
				description,
				category: selectedCategory,
				tags,
				collaborators,
				copyright,
				commercialCopyright,
				modifyCopyright,
				workImages,
			};

			const statusCode = await workService.uploadWork(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
			}

			if (statusCode == RESPONSE_STATUS_201) {
				setIsEdited(false);
				Router.replace('/mypage');
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	return [blankInputs, isFormSubmitted, submitUploadWorkForm];
};

export default useUploadWorkForm;
