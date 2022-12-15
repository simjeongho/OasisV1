import UploadedWorkCard from 'components/shared/UploadedWorkCard';
import { EmptyGuideBox } from 'components/shared/EmptyGuideBox/styled';
import { UploadedMyWorks, WorksContainer, WorksMoreButton } from 'components/features/MyPage/MyWorks/styled';
import useGetUserWorks from 'components/features/User/UserWorks/useGetUserWorks';
import { HomeFeed } from 'types/work';

type Props = {
	userId: string;
	userWorkFallbackData: HomeFeed[];
};

const UserWorks = ({ userId, userWorkFallbackData }: Props) => {
	const [allUserWorks, isReachingEnd, handleClickMoreWorksButton] = useGetUserWorks(userId, userWorkFallbackData);

	return (
		<WorksContainer $works={allUserWorks.length} aria-labelledby="user_works_label">
			<h2 id="user_works_label" hidden>
				유저 프로젝트
			</h2>
			{allUserWorks?.length === 0 ? (
				<EmptyGuideBox>아직 등록된 프로젝트가 없어요</EmptyGuideBox>
			) : (
				<>
					<UploadedMyWorks>
						{allUserWorks?.map(({ uuid, coverFile, title, user: { profileImage, userName } }) => (
							<li key={uuid}>
								<UploadedWorkCard
									id={uuid}
									coverFile={coverFile.path}
									title={title}
									profileImage={profileImage}
									userName={userName}
									onlyImage
								/>
							</li>
						))}
					</UploadedMyWorks>
					{!isReachingEnd && (
						<WorksMoreButton type="button" onClick={handleClickMoreWorksButton}>
							더보기
						</WorksMoreButton>
					)}
				</>
			)}
		</WorksContainer>
	);
};

export default UserWorks;
