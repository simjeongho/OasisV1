import React from 'react';
import Image, { ImageProps } from 'next/image';
import styled, { css } from 'styled-components';

type StyledProps = {
	$imageRatio: boolean | undefined;
};

const ImageWrapper = styled.div`
	width: 100%;
	position: relative;

	${({ $imageRatio }: StyledProps) =>
		$imageRatio === true &&
		css`
			height: 100%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			min-width: calc(100%);
		`}

	${({ $imageRatio }: StyledProps) =>
		$imageRatio === false &&
		css`
			width: 100%;
			position: absolute;
			bottom: 50%;
			transform: translateY(50%);
			min-height: calc(100%);
		`}

	& > span {
		position: unset !important;

		${({ $imageRatio }: StyledProps) =>
			$imageRatio === true &&
			css`
				height: 100% !important;
			`}

		& > img {
			position: relative !important;
			height: auto !important;
		}
	}
`;

type Props = Omit<ImageProps, 'layout' | 'width' | 'height'> & { $imageRatio?: boolean };

const NextResponsiveImage = ({ src, alt = '', $imageRatio, ...args }: Props) => {
	return (
		<ImageWrapper $imageRatio={$imageRatio}>
			<Image src={src} alt={alt} {...args} layout="fill" />
		</ImageWrapper>
	);
};

export default NextResponsiveImage;
