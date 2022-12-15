import { useEffect, useMemo, useState } from 'react';
import { USER_UNIVERSITY_VERIFICATION } from '../../../../constants/user';
import { BASIC_ERROR_MESSAGE } from 'constants/api';
import { useDispatch, useSelector } from 'react-redux';
import { responseErrorWarning } from 'stores/slices/user-slice';
import { selectUser } from 'stores/store';
import useSWR from 'swr';
import API_URL, { API_HOST } from 'apis/api';
import { profileFetcher } from 'utils/fetcher';
import UserService from 'apis/User/user-service';
import { Profile } from 'types/user';

const userService = new UserService();

type ReturnType = [Profile | undefined, boolean, () => void, boolean];

const useGetUserInfo = (userId: string, userInfoFallbackData: Profile): ReturnType => {
	const dispatch = useDispatch();

	const userSelector = useSelector(selectUser);
	const { isLogin } = userSelector;

	const {
		user: { basic, search },
	} = API_URL;

	const { data: profileData, mutate } = useSWR<Profile>(
		[`${API_HOST}${basic}/${userId}${search}`, isLogin],
		profileFetcher,
		{
			fallbackData: userInfoFallbackData || undefined,
		},
	);

	const [isLikeClicked, setIsLikeClicked] = useState(profileData?.hasHeart || false);

	useEffect(() => {
		if (profileData) {
			setIsLikeClicked(profileData.hasHeart);
		}
	}, [profileData]);

	const handleClickHeartButton = () => {
		if (!profileData) return;

		try {
			const { hasHeart, heartCount } = profileData;

			userService.toggleHeartCount(userId);
			setIsLikeClicked(!hasHeart);
			mutate(
				{
					...profileData,
					hasHeart: !hasHeart,
					heartCount: hasHeart === true ? heartCount - 1 : heartCount + 1,
				},
				false,
			);
		} catch (error) {
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	const isUniversityVerified = useMemo(
		() => profileData?.universityVerify === USER_UNIVERSITY_VERIFICATION,

		[profileData],
	);

	return [profileData, isLikeClicked, handleClickHeartButton, isUniversityVerified];
};

export default useGetUserInfo;
