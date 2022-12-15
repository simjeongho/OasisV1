import { useMemo } from 'react';
import OasisSmallLogo from 'assets/images/layout/oasis_logo_small.svg';
import { LayoutHeader, HeaderLogoTitle, HeaderMenuButton, HeaderMenuList, HeaderLogo, HeaderNavMenu } from './styled';
import { useSelector } from 'react-redux';
import { selectUI, selectUser } from 'stores/store';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
	const userSelector = useSelector(selectUser);
	const { isLogin } = userSelector;

	const { headerType } = useSelector(selectUI);
	const isDefaultHeaderVisible = useMemo(() => headerType !== 'default', [headerType]);

	const { pathname } = useRouter();

	return (
		<LayoutHeader hidden={isDefaultHeaderVisible} aria-hidden={isDefaultHeaderVisible}>
			<Link href="/" passHref>
				<HeaderLogo>
					<HeaderLogoTitle>Oasis</HeaderLogoTitle>
					<OasisSmallLogo />
				</HeaderLogo>
			</Link>
			<HeaderNavMenu>
				<HeaderMenuList>
					{isLogin ? (
						<>
							<li>
								<Link href="/" passHref>
									<HeaderMenuButton $selected={pathname === '/'}>홈</HeaderMenuButton>
								</Link>
							</li>
							<li>
								<Link href="/mypage" passHref>
									<HeaderMenuButton $selected={pathname === '/mypage'}>아트로그</HeaderMenuButton>
								</Link>
							</li>
							<li>
								<Link href="/settings" passHref>
									<HeaderMenuButton $selected={pathname === '/settings'}>설정</HeaderMenuButton>
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link href="/" passHref>
									<HeaderMenuButton $selected={pathname === '/'}>홈</HeaderMenuButton>
								</Link>
							</li>
							<li>
								<Link href="/login" passHref>
									<HeaderMenuButton $selected={pathname === '/login'}>로그인</HeaderMenuButton>
								</Link>
							</li>
						</>
					)}
				</HeaderMenuList>
			</HeaderNavMenu>
		</LayoutHeader>
	);
};

export default Header;
