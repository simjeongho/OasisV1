import { useState } from 'react';
import UploadedWorkCard from 'components/shared/UploadedWorkCard';
import WorkCategories from 'components/shared/WorkCategories';
import { EmptyGuideArea, FeedListContainer, FeedListWrapper, FeedMoreButton } from './styled';
import useGetAllFeedList from 'components/features/Home/FeedList/useGetAllFeedList';

const FeedList = () => {
	const [selectedCategory, setSelectedCategory] = useState('ALL');

	const [allFeedsData, isReachingEnd, handleClickMoreFeedsButton] = useGetAllFeedList(selectedCategory);

	return (
		<FeedListContainer>
			<h2>아트 스토리</h2>
			<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
			{allFeedsData.length === 0 ? (
				<EmptyGuideArea>아직 등록된 프로젝트가 없어요</EmptyGuideArea>
			) : (
				<>
					<FeedListWrapper>
						{allFeedsData.flat().map(({ uuid, title, coverFile, user: { profileImage, userName } }) => (
							<li key={uuid}>
								<UploadedWorkCard
									id={uuid}
									coverFile={coverFile?.path}
									title={title}
									profileImage={profileImage}
									userName={userName}
								/>
							</li>
						))}
					</FeedListWrapper>
					{!isReachingEnd && (
						<FeedMoreButton type="button" onClick={handleClickMoreFeedsButton}>
							더보기
						</FeedMoreButton>
					)}
				</>
			)}
		</FeedListContainer>
	);
};

export default FeedList;
