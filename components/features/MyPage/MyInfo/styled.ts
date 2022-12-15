import { IoMdHeart } from 'react-icons/io';
import styled from 'styled-components';

type StyledProps = {
	$isUniversityVerified?: boolean;
	$imageRatio?: boolean;
};
export const UserInfoContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-bottom: 2%;
	border-bottom: 1px solid var(--color-lighter-gray);
`;

export const UserProfile = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 7.1%;
`;

export const UserImageWrapper = styled.div`
	margin-right: 4%;
	width: 100px;
	overflow-y: hidden;
	position: relative;
	flex-shrink: 0;
	border-radius: 50%;
	padding-bottom: 100px;
	height: 0;
`;

export const PersonalInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;

	& > p {
		&:nth-child(1) {
			margin: 0 0 2% 0;
		}

		&:nth-child(2) {
			margin: 0 0 4% 0;
			${({ $isUniversityVerified }: StyledProps) => ($isUniversityVerified ? '' : 'color: var(--color-dark-gray);')}
		}
	}
`;

export const UserIntroduction = styled.p`
	width: 100%;
	margin: 0 0 4% 0;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
`;

export const UserLikeInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > span {
		display: flex;
		align-items: center;
		font-size: 0.75rem;

		& > span {
			font-family: var(--font-nanum-bold);
			height: 18px;
			line-height: 20px;
		}
	}
`;

export const MyLikes = styled.a`
	font-size: 0.75rem;
	color: #222222;
	text-decoration: underline;
`;

export const ProfileEditButton = styled.a`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 84px;
	background-color: transparent;
	color: var(--color-gray);
	margin: 5% 0;
	padding: 0 0.2%;
	border-bottom: 1px solid var(--color-gray);
	font-size: 0.75rem;
	font-family: var(--font-nanum-bold);

	& > svg {
		font-size: 1.25rem;
	}
`;

export const LikeImage = styled(IoMdHeart)`
	color: black;
	width: 1.125rem;
	height: 1.125rem;
	flex-shrink: 0;
	margin-right: 16%;
`;
