import UploadedWorkCard from 'components/shared/UploadedWorkCard';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/store';
import { GuideMessage, UploadedMyWorks, UploadWorkButton, WorksContainer, WorksMoreButton } from './styled';
import useGetAllMyWorks from 'components/features/MyPage/MyWorks/useGetAllMyWorks';
import PlusAddButton from 'assets/images/mypage/plus_add_button.svg';
import Link from 'next/link';

const MyWorks = () => {
	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	const [allMyWorks, isReachingEnd, handleClickMoreWorksButton] = useGetAllMyWorks(uuid);

	return (
		<WorksContainer $works={allMyWorks.length} aria-labelledby="mypage_my_works_label">
			<h2 id="mypage_my_works_label" hidden>
				내 프로젝트
			</h2>
			{allMyWorks.length === 0 ? (
				<>
					<GuideMessage>여러분의 첫 프로젝트를 등록해보세요!</GuideMessage>
					<Link href="/mypage/upload" passHref>
						<UploadWorkButton>
							<PlusAddButton alt="새 프로젝트 등록" />
						</UploadWorkButton>
					</Link>
				</>
			) : (
				<>
					<Link href="/mypage/upload" passHref>
						<UploadWorkButton>
							<PlusAddButton alt="새 프로젝트 등록" />
						</UploadWorkButton>
					</Link>
					<UploadedMyWorks>
						{allMyWorks?.map(({ uuid, coverFile, title, user: { profileImage, userName } }) => (
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

export default MyWorks;
