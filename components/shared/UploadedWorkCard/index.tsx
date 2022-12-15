import { WorkCardContainer, WorkCardImage, WorkCardInfo, WorkCardTitle, WorkCardUserInfo } from './styled';
import UserProfileBlank from 'assets/images/mypage/user_profile_blank_small.svg';
import useImageSize from 'hooks/useImageSize';
import Link from 'next/link';
import NextResponsiveImage from '../ResponsiveImage';

type Props = {
	id: string;
	coverFile: string;
	title: string;
	profileImage: string;
	userName: string;
	onlyImage?: boolean;
};

const UploadedWorkCard = ({ id, coverFile, title, profileImage, userName, onlyImage = false }: Props) => {
	const imageRatio = useImageSize(profileImage);

	return (
		<Link href={`/detail/${id}`} passHref>
			<WorkCardContainer>
				<WorkCardInfo $onlyImage={onlyImage}>
					<WorkCardImage src={coverFile} alt="" $onlyImage={onlyImage} />
					<WorkCardTitle>{title}</WorkCardTitle>
				</WorkCardInfo>

				<WorkCardUserInfo $onlyImage={onlyImage}>
					<div>
						{profileImage ? <NextResponsiveImage src={profileImage} $imageRatio={imageRatio} /> : <UserProfileBlank />}
					</div>

					<p>{userName}</p>
				</WorkCardUserInfo>
			</WorkCardContainer>
		</Link>
	);
};

export default UploadedWorkCard;
