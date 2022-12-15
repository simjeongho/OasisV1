import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';
import { selectUser } from 'stores/store';
import useLogout from 'hooks/useLogout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import WithAuth from 'utils/HOC/withAuth';

type StyledProps = {
	$isLogin: boolean;
};

export const SettingsContainer = styled.main`
	padding: 3.3% 0 5% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-bottom: 100%;
`;

export const AboutUser = styled.div`
	padding: ${({ $isLogin }: StyledProps) => ($isLogin ? '4.8%' : '7%')} 7%;
	width: 100%;
	background-color: #fffdf1;
	border-radius: 8px;

	& > p {
		&:nth-child(1) {
			font-size: 1.25rem;
			margin: 0 0 2.2% 0;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.875rem;
			margin: 0 0 1% 0;
		}

		&:last-child {
			font-size: 0.625rem;
			color: var(--color-dark-gray);
			margin: 1% 0 0 0;
		}
	}
`;

export const SettingsMenus = styled.ul`
	width: 100%;
	margin: 4% 0 9.5% 0;
	padding: 0 7%;

	& > li {
		width: 100%;
		font-size: 1.125rem;
		margin: 1.5% 0;

		& > a,
		button {
			width: 100%;
			color: black;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 3% 0;
			font-family: var(--font-nanum-bold);
			font-size: 1.125rem;
			background-color: transparent;
		}
	}
`;

export const LogoutButton = styled.button`
	border: 1px solid #848484;
	color: var(--color-dark-gray);
	border-radius: 8px;
	font-size: 1.125rem;
	background-color: transparent;
	width: 86%;
	height: 48px;
	display: block;
	margin: auto;
	font-family: var(--font-nanum-bold);
`;

const Settings = () => {
	const { isLogin, userName, emailId } = useSelector(selectUser);
	const handleClickLogoutButton = useLogout();

	const handleClickNotices = () => {
		window.open('https://o4sis.notion.site/505d741305a149c6b029aa435af054f6', '_blank', 'noopener');
	};

	const handleOpenMail = () => {
		window.open('mailto:oasis.yeha@gmail.com', '_blank', 'noopener');
	};

	return (
		<SettingsContainer>
			<AboutUser $isLogin={isLogin}>
				{isLogin ? (
					<>
						<p>{userName}</p>
						<p>{emailId}</p>
						<p>이메일 변경을 원하시면 오아시스에 문의해주세요</p>
					</>
				) : (
					<>
						<p>로그인해주세요</p>
						<p>아이디 / 비밀번호 관련 문의는 오아시스에 문의하기를 이용해주세요</p>
					</>
				)}
			</AboutUser>

			<SettingsMenus>
				{isLogin && (
					<>
						<li>
							<Link href="/settings/certification">
								<a>
									학교 인증하기 <MdChevronRight />
								</a>
							</Link>
						</li>
						<li>
							<Link href="/settings/change-password">
								<a>
									비밀번호 변경하기 <MdChevronRight />
								</a>
							</Link>
						</li>
					</>
				)}

				<li>
					<button type="button" onClick={handleClickNotices}>
						공지사항 <MdChevronRight />
					</button>
				</li>
				<li>
					<button onClick={handleOpenMail}>
						오아시스에 문의하기 <MdChevronRight />
					</button>
				</li>
			</SettingsMenus>
			{isLogin && (
				<LogoutButton type="button" onClick={handleClickLogoutButton}>
					로그아웃
				</LogoutButton>
			)}
		</SettingsContainer>
	);
};

export default WithAuth(Settings, true);
