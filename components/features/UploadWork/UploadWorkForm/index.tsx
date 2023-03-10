import { useCallback, useState } from 'react';
import { InvisibleFileInput } from 'components/shared/InvisibleFileInput/styled';
import useInput from 'hooks/useInput';
import WorkCategories from 'components/shared/WorkCategories';
import {
	FillBlankInstructions,
	UploadForm,
	UploadGuide,
	UploadInputField,
	UploadInputTitle,
	UploadWorkTextArea,
	UploadWorkInput,
	CopyrightOptionList,
	CopyrightOptionItem,
	CopyrightSubOptionList,
	CopyrightSubOptionButtonList,
	CopyrightSubOptionButton,
} from './styled';
import useUploadWorkForm from 'components/features/UploadWork/UploadWorkForm/useUploadWorkForm';
import useUploadWorkImages from 'components/features/UploadWork/UploadWorkForm/useUploadWorkImages';
import UploadedWorkImages from 'components/features/UploadWork/UploadedWorkImages';
import ConfirmModal from 'components/shared/ConfirmModal';
import AlertModal from 'components/shared/AlertModal';
import CheckIcon from 'assets/images/mypage/check_icon.svg';
import { CommercialCopyright, ModifyCopyright } from 'types/work';
import { ALLOW, COMMERCIAL, DERIVED_FROM_SAME_CONDITION_ALLOW, NONE_COMMERCIAL, NOT_ALLOW } from 'constants/copyright';
import SubHeader from 'components/layout/RightSide/SubHeader';
import { MyPageContainer } from 'pages/mypage';

type Props = {
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadWorkForm = ({ setIsEdited }: Props) => {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [title, handleTitle] = useInput('');
	const [description, handleDescription] = useInput('');
	const [tags, handleTags] = useInput('');
	const [collaborators, handleCollaborators] = useInput('');
	const [copyright, handleCopyright] = useInput('');
	const [commercialCopyright, setCommercialCopyright] = useState<CommercialCopyright>(COMMERCIAL);
	const [modifyCopyright, setModifyCopyright] = useState<ModifyCopyright>(ALLOW);

	const [
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
	] = useUploadWorkImages();

	const [showImageLimitModal, setShowImageLimitModal] = useState(false);

	const handleClickConfirmButton = useCallback(() => {
		setShowImageLimitModal(false);
	}, []);

	const [blankInputs, isFormSubmitted, submitUploadWorkForm] = useUploadWorkForm(
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
		},
		setIsEdited,
	);

	const clickUploadedWorkImage = (idx: number) => {
		clickChangeImageButton(idx);

		changeImageRef.current?.click();
	};

	const clickWorkImageInput = () => {
		workImagesRef.current?.click();
	};

	return (
		<>
			<SubHeader buttonName="??????" buttonType="submit" clickFn={submitUploadWorkForm} />
			<MyPageContainer>
				<UploadForm>
					<h2>??? ??????????????? ??????</h2>

					<ul>
						<UploadInputField>
							<label htmlFor="upload_work_images">??????*</label>
							{blankInputs.workImages && (
								<FillBlankInstructions id="upload_works_error_message" role="alert">
									???????????? ??????????????????
								</FillBlankInstructions>
							)}
							<UploadGuide id="work_images_input_description">??????????????? ????????? ???????????? ??????????????????</UploadGuide>
							<InvisibleFileInput
								type="file"
								id="upload_work_images"
								accept="image/jpg, image/jpeg, image/png"
								multiple
								ref={workImagesRef}
								onChange={uploadWorkImages}
								aria-required="true"
								aria-invalid={isFormSubmitted && blankInputs.workImages}
								aria-errormessage="upload_work_images_error_message"
							/>
							<InvisibleFileInput
								type="file"
								accept="image/jpg, image/jpeg, image/png"
								ref={changeImageRef}
								onChange={changeUploadedWorkImage}
							/>
							<UploadedWorkImages
								workImages={workImages}
								clickRemoveButton={clickRemoveButton}
								clickWorkImageInput={clickWorkImageInput}
								clickUploadedWorkImage={clickUploadedWorkImage}
							/>
						</UploadInputField>

						<UploadInputField>
							<UploadInputTitle>????????????*</UploadInputTitle>
							{blankInputs.selectedCategory && (
								<FillBlankInstructions role="alert">??????????????? 1??? ??????????????????</FillBlankInstructions>
							)}
							<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
						</UploadInputField>

						<UploadInputField>
							<label htmlFor="upload_title">??????*</label>
							{blankInputs.title && (
								<FillBlankInstructions id="upload_title_error_message" role="alert">
									????????? ??????????????????
								</FillBlankInstructions>
							)}
							<UploadWorkInput
								id="upload_title"
								placeholder="????????? ??????????????????"
								value={title}
								onChange={handleTitle}
								aria-required="true"
								aria-invalid={isFormSubmitted && blankInputs.title}
								aria-errormessage="upload_title_error_message"
							/>
						</UploadInputField>

						<UploadInputField>
							<label htmlFor="upload_description">??????*</label>
							{blankInputs.description && (
								<FillBlankInstructions id="upload_description_error_message" role="alert">
									????????? ??????????????????
								</FillBlankInstructions>
							)}
							<UploadWorkTextArea
								id="upload_description"
								placeholder="?????? ?????? ????????? ??????????????????"
								value={description}
								onChange={handleDescription}
								aria-required="true"
								aria-invalid={isFormSubmitted && blankInputs.description}
								aria-errormessage="upload_description_error_message"
							/>
						</UploadInputField>
					</ul>

					<UploadInputField>
						<label htmlFor="upload_tag">??????*</label>
						{blankInputs.tags && (
							<FillBlankInstructions id="upload_tag_error_message" role="alert">
								????????? ??????????????????
							</FillBlankInstructions>
						)}
						<UploadWorkInput
							id="upload_tag"
							placeholder="# ????????? ??????????????????"
							value={tags}
							onChange={handleTags}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.tags}
							aria-errormessage="upload_tag_error_message"
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_friends">????????? ??????</label>
						<UploadWorkInput
							id="upload_friends"
							placeholder="????????? ????????? ????????? ??????????????????"
							value={collaborators}
							onChange={handleCollaborators}
						/>
					</UploadInputField>

					<UploadInputField>
						<UploadInputTitle>CCL ??????*</UploadInputTitle>
						{blankInputs.copyright && (
							<FillBlankInstructions id="upload_ccl_error_message" role="alert">
								CCL ????????? ??????????????????
							</FillBlankInstructions>
						)}
						<CopyrightOptionList>
							<CopyrightOptionItem>
								<input
									type="radio"
									id="upload_copyright_hide"
									name="copyright"
									value="hide"
									checked={copyright === 'hide'}
									onChange={handleCopyright}
								/>
								<label htmlFor="upload_copyright_hide">?????? ??? ???</label>
								{copyright === 'hide' && <CheckIcon alt="" />}
							</CopyrightOptionItem>
							<CopyrightOptionItem>
								<input
									type="radio"
									id="upload_copyright_show"
									name="copyright"
									value="show"
									checked={copyright === 'show'}
									onChange={handleCopyright}
								/>
								<label htmlFor="upload_copyright_show">????????? ??????</label>
								{copyright === 'show' && <CheckIcon alt="" />}

								{copyright === 'show' && (
									<CopyrightSubOptionList>
										<li>
											????????? ??????
											<CopyrightSubOptionButtonList>
												<li>
													<CopyrightSubOptionButton
														type="button"
														$selected={commercialCopyright === COMMERCIAL}
														onClick={() => setCommercialCopyright(COMMERCIAL)}
													>
														??????
													</CopyrightSubOptionButton>
												</li>
												<li>
													<CopyrightSubOptionButton
														type="button"
														$selected={commercialCopyright === NONE_COMMERCIAL}
														onClick={() => setCommercialCopyright(NONE_COMMERCIAL)}
													>
														??????
													</CopyrightSubOptionButton>
												</li>
											</CopyrightSubOptionButtonList>
										</li>
										<li>
											????????? ??????
											<CopyrightSubOptionButtonList>
												<li>
													<CopyrightSubOptionButton
														type="button"
														$selected={modifyCopyright === ALLOW}
														onClick={() => setModifyCopyright(ALLOW)}
													>
														??????
													</CopyrightSubOptionButton>
												</li>
												<li>
													<CopyrightSubOptionButton
														type="button"
														$selected={modifyCopyright === DERIVED_FROM_SAME_CONDITION_ALLOW}
														onClick={() => setModifyCopyright(DERIVED_FROM_SAME_CONDITION_ALLOW)}
													>
														????????? ?????? ??????
													</CopyrightSubOptionButton>
												</li>
												<li>
													<CopyrightSubOptionButton
														type="button"
														$selected={modifyCopyright === NOT_ALLOW}
														onClick={() => setModifyCopyright(NOT_ALLOW)}
													>
														??????
													</CopyrightSubOptionButton>
												</li>
											</CopyrightSubOptionButtonList>
										</li>
									</CopyrightSubOptionList>
								)}
							</CopyrightOptionItem>
						</CopyrightOptionList>
					</UploadInputField>
				</UploadForm>

				{workImageToBeDeleted !== null && (
					<AlertModal
						content="???????????? ????????????????"
						confirmName="??????"
						cancelName="??????"
						onConfirm={deleteClickedImage}
						onCancel={cancelToRemoveImages}
					/>
				)}
				{showImageLimitModal && (
					<ConfirmModal
						content="?????? ???????????? ?????? 10MB ????????? ????????? ??? ?????????"
						onConfirm={handleClickConfirmButton}
					/>
				)}
			</MyPageContainer>
		</>
	);
};

export default UploadWorkForm;
