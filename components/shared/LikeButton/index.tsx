import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import styled from 'styled-components';

type StyledProps = {
	$isLikeClicked: boolean;
};
export const UserLikeButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid var(--color-blue);
	border-radius: 4px;
	background-color: ${({ $isLikeClicked }: StyledProps) => ($isLikeClicked ? 'var(--color-blue)' : 'transparent')};
	color: ${({ $isLikeClicked }: StyledProps) => ($isLikeClicked ? 'var(--color-white)' : 'var(--color-blue)')};
	padding: 6px 10px 6px 8px;
	width: 50px;
	height: 24px;

	& > span {
		height: 18px;
		line-height: 20px;
		font-size: 0.75rem;
		font-family: var(--font-nanum-bold);
	}
`;

export const ClickedLikeImage = styled(IoMdHeart)`
	color: var(--color-white);
	width: 1.125rem;
	height: 1.125rem;
	flex-shrink: 0;
`;

export const UnClickedLikeImage = styled(IoMdHeartEmpty)`
	color: var(--color-blue);
	width: 1.125rem;
	height: 1.125rem;
	flex-shrink: 0;
`;

type Props = {
	isLikeClicked: boolean;
	handleClickButton?: () => void;
	heartCount?: number;
};

const LikeButton = ({ isLikeClicked, handleClickButton, heartCount }: Props) => {
	return (
		<UserLikeButton
			$isLikeClicked={isLikeClicked}
			onClick={handleClickButton}
			role="switch"
			aria-label="좋아요"
			aria-checked={isLikeClicked}
		>
			{isLikeClicked ? <ClickedLikeImage /> : <UnClickedLikeImage />} <span>{heartCount || '0'}</span>
		</UserLikeButton>
	);
};

export default LikeButton;
