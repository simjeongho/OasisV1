import React, { useState } from 'react';
import { WorkImage } from 'types/work';
import styled, { css } from 'styled-components';
import { RemoveUploadedImageButton, UploadImageBox } from '../UploadWorkForm/styled';
import CloseIcon from 'assets/images/mypage/close_icon.svg';
import PlusIcon from 'assets/images/mypage/plus_icon.svg';
import NextResponsiveImage from 'components/shared/ResponsiveImage';

type StyledProps = {
	$first: boolean;
};
export const WorkImages = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 4%;
	width: 100%;

	& > li {
		width: 48%;
		margin-bottom: 3%;
	}
`;

export const WorkImageWrapper = styled.li`
	position: relative;
	border: 0.2px solid var(--color-dark-gray);

	${({ $first }: StyledProps) =>
		$first &&
		css`
			&::after {
				content: '대표';
				position: absolute;
				top: 5px;
				left: 4px;
				width: 25px;
				height: 16px;
				border: 0.2px solid #fff16f;
				border-radius: 4px;
				background-color: #f9e002;
				color: white;
				font-size: 0.5rem;
				line-height: 16px;
				text-align: center;
				font-family: var(--font-nanum-bold);
			}
		`}
`;

export const WorkImageCover = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(132, 132, 132, 0.4);
	cursor: pointer;
	border: none;

	& > button {
		background-color: var(--color-blue);
		color: white;
		border: 0.2px solid #363636;
		border-radius: 4px;
		font-size: 0.875rem;
		padding: 7px 13px;
		font-family: var(--font-nanum-bold);
	}
`;

export const UploadedWorkImage = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;

	& > div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const CoverImageButton = styled.button`
	width: 100%;
	height: 100%;
	padding: 0;
	background-color: transparent;
`;

type Props = {
	workImages: WorkImage[];
	clickRemoveButton: (id: number) => void;
	clickWorkImageInput: () => void;
	clickUploadedWorkImage: (idx: number) => void;
};

const UploadedWorkImages = ({ workImages, clickRemoveButton, clickWorkImageInput, clickUploadedWorkImage }: Props) => {
	const [selectedImage, setSelectedImage] = useState(-1);

	const resetSelectedImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		setSelectedImage(-1);
	};

	const selectImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
		e.stopPropagation();

		clickUploadedWorkImage(idx);
	};

	const handleClickRemoveButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
		e.stopPropagation();

		clickRemoveButton(id);
	};

	return (
		<WorkImages>
			{workImages.map(({ id, thumbnail }, idx) => (
				<WorkImageWrapper key={id} onClick={() => setSelectedImage(id)} $first={idx === 0}>
					<CoverImageButton type="button">
						<UploadedWorkImage>
							<NextResponsiveImage src={thumbnail} alt="업로드 한 포트폴리오 상세 이미지 선택" />
						</UploadedWorkImage>
					</CoverImageButton>

					<RemoveUploadedImageButton type="button" onClick={(e) => handleClickRemoveButton(e, id)}>
						<CloseIcon alt="삭제하기" />
					</RemoveUploadedImageButton>

					{selectedImage === id && (
						<WorkImageCover onClick={resetSelectedImage}>
							<button type="button" onClick={(e) => selectImage(e, idx)}>
								변경
							</button>
						</WorkImageCover>
					)}
				</WorkImageWrapper>
			))}

			<li key="upload_image_button">
				<UploadImageBox type="button" onClick={clickWorkImageInput} aria-label="포트폴리오 상세 이미지 추가">
					<PlusIcon alt="이미지 추가하기" />
				</UploadImageBox>
			</li>
		</WorkImages>
	);
};

export default UploadedWorkImages;
