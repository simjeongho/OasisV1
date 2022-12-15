import { useState } from 'react';
import {
	WorkDatailImage,
	WorkDetailDescription,
	WorkDetailImages,
	WorkDetailIntro,
	WorkWriterInfo,
	WorkWriterLink,
	WorkSubInfo,
	WorkSubInfoToggleButton,
	WorkSubInfoTable,
} from './styled';
import UserProfileBlank from 'assets/images/mypage/user_profile_blank_small.svg';
import useImageSize from 'hooks/useImageSize';
import AlertModal from 'components/shared/AlertModal';
import useDeleteWork from 'components/features/Detail/WorkDetailContent/useDeleteWork';
import { dateFormatter } from 'utils/formatter';
import ArrowUpIcon from 'assets/images/detail/arrow_up.svg';
import { CATEGORIES } from 'constants/categories';
import { WorkDetailInfo } from 'types/work';
import Link from 'next/link';
import NextResponsiveImage from 'components/shared/ResponsiveImage';
import useGetWorkDetail from './useGetWorkDetail';
import useChangeHeader from 'hooks/useChangeHeader';

type Props = {
	workDetailFallbackData: WorkDetailInfo | null;
	showDeleteModal: boolean;
	handleClickCancelButton: () => void;
};

const WorkDetailContent = ({ workDetailFallbackData, showDeleteModal, handleClickCancelButton }: Props) => {
	const [workDetailData, isMine, cclInstruction] = useGetWorkDetail(workDetailFallbackData);

	useChangeHeader('sub', isMine);

	const imageRatio = useImageSize(workDetailData?.user.profileImage);

	const handleDeleteWork = useDeleteWork(workDetailData?.uuid);

	const [showWorkSubInfo, setShowWorkSubInfo] = useState(false);
	const toggleWorkSubInfoSection = () => {
		setShowWorkSubInfo((prev) => !prev);
	};

	return (
		<article>
			{workDetailData && (
				<>
					<WorkDetailIntro aria-labelledby="work_detail_intro_label">
						<span>{CATEGORIES[workDetailData.category]}</span>
						<h2 id="work_detail_intro_label">{workDetailData.title}</h2>
						<NextResponsiveImage src={workDetailData.artFiles[0]?.path} priority />
					</WorkDetailIntro>

					<WorkDetailDescription aria-labelledby="work_detail_description_label">
						<h3 id="work_detail_description_label" hidden>
							프로젝트 상세 설명
						</h3>

						<p>{workDetailData.description}</p>
					</WorkDetailDescription>

					<WorkDetailImages aria-labelledby="work_detail_images_label">
						<h3 id="work_detail_images_label" hidden>
							프로젝트 이미지
						</h3>
						<ul>
							{workDetailData.artFiles.map((image, idx) => {
								if (idx === 0) return;
								return (
									<WorkDatailImage key={image.uuid}>
										<NextResponsiveImage src={image?.path} />
									</WorkDatailImage>
								);
							})}
						</ul>
					</WorkDetailImages>

					<WorkWriterInfo aria-labelledby="work_writer_description_label">
						<h3 id="work_writer_description_label" hidden>
							작성자 설명
						</h3>

						<Link href={`/user/${workDetailData.user.userUuid}`} passHref>
							<WorkWriterLink>
								<span>
									{workDetailData.user.profileImage ? (
										<NextResponsiveImage src={workDetailData.user.profileImage} $imageRatio={imageRatio} />
									) : (
										<UserProfileBlank alt="" />
									)}
								</span>

								{workDetailData.user.userName}
							</WorkWriterLink>
						</Link>
					</WorkWriterInfo>

					<WorkSubInfo aria-labelledby="work_sub_info_label">
						<h3 id="work_sub_info_label" hidden>
							프로젝트 관련 정보
						</h3>
						<WorkSubInfoToggleButton
							type="button"
							onClick={toggleWorkSubInfoSection}
							aria-controls="work_sub_info_table"
							aria-expanded={showWorkSubInfo}
							expanded={showWorkSubInfo}
						>
							<span>프로젝트 정보</span>
							<ArrowUpIcon alt="" />
						</WorkSubInfoToggleButton>

						{showWorkSubInfo && (
							<WorkSubInfoTable id="work_sub_info_table">
								<tbody>
									<tr>
										<td>등록일</td>
										<td>{dateFormatter(workDetailData.createDate, '/')}</td>
									</tr>
									<tr>
										<td>태그</td>
										<td>
											{workDetailData.tags?.map((tag, idx) => (
												<span key={idx}>{tag}</span>
											))}
										</td>
									</tr>
									<tr>
										<td>함께한 친구</td>
										<td>{workDetailData.collaborators}</td>
									</tr>
									<tr>
										<td>저작권</td>
										<td>
											{cclInstruction?.map((ccl, idx) => (
												<span key={idx}>{ccl}</span>
											))}
										</td>
									</tr>
								</tbody>
							</WorkSubInfoTable>
						)}
					</WorkSubInfo>

					{showDeleteModal && (
						<AlertModal
							content="이 프로젝트를 삭제할까요?"
							confirmName="확인"
							cancelName="취소"
							onConfirm={handleDeleteWork}
							onCancel={handleClickCancelButton}
						/>
					)}
				</>
			)}
		</article>
	);
};

export default WorkDetailContent;
