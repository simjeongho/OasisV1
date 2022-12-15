import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import UserProfileBlank from 'assets/images/mypage/user_profile_blank_small.svg';
import { USER_UNIVERSITY_VERIFICATION } from 'constants/user';
import { memo } from 'react';

type StyeldProps = {
	$checkUniversity: boolean;
};

export const LikeUserImageWrapper = styled.div`
	margin-right: 10px;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	overflow: hidden;
`;

export const LikeUserInfo = styled.a`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 8%;

	& > p {
		font-size: 0.875rem;
		margin: 0;
		color: ${({ $checkUniversity }: StyeldProps) => ($checkUniversity ? 'black' : 'var(--color-dark-gray)')};
		line-height: 20px;
		font-family: var(--font-nanum-light);

		& > span {
			font-family: var(--font-nanum-bold);
			color: black;
		}
	}
`;

type Props = {
	uuid: string;
	universityVerify: string;
	profileImgPath: string;
	userName: string;
	universityName: string | null;
	universityMajor: string | null;
};

const MyLikesItem = ({ uuid, universityVerify, profileImgPath, userName, universityName, universityMajor }: Props) => {
	return (
		<Link href={`/user/${uuid}`} passHref>
			<LikeUserInfo $checkUniversity={universityVerify === USER_UNIVERSITY_VERIFICATION}>
				<LikeUserImageWrapper>
					{profileImgPath ? <Image src={profileImgPath} alt="" width={40} height={40} /> : <UserProfileBlank />}
				</LikeUserImageWrapper>

				<p>
					<span>{userName}</span>
					<br />
					{universityVerify === USER_UNIVERSITY_VERIFICATION ? `${universityName} ${universityMajor}` : '대학교 미인증'}
				</p>
			</LikeUserInfo>
		</Link>
	);
};

export default memo(MyLikesItem);
