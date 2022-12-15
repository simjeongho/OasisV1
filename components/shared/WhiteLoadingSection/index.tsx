import Image from 'next/image';
import styled from 'styled-components';
import LoadingIndicatorImage from 'assets/images/loadingIndicator/loading_indicator.png';

type StyledProps = {
	height: string;
};

const LoadingWrapper = styled.div`
	width: 100%;
	height: ${({ height }: StyledProps) => height};
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LoadingIndicator = styled(Image)`
	animation: spin 800ms infinite linear;
	@keyframes "spin" {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
`;

type Props = {
	height?: string;
};

const WhiteLoadingSection = ({ height = '100%' }: Props) => {
	return (
		<LoadingWrapper height={height}>
			<LoadingIndicator src={LoadingIndicatorImage} alt="" width={30} height={30} />
		</LoadingWrapper>
	);
};

export default WhiteLoadingSection;
