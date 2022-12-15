import InstaIcon from 'assets/images/layout/insta_icon.svg';
import MailIcon from 'assets/images/layout/mail_icon.svg';
import { LayoutFooter, FooterOptionList, FooterOptionButton, FooterCompanyInfo, FooterCopyright } from './styled';

const Footer = () => {
	const handleClickTerms = () => {
		window.open('https://o4sis.notion.site/63695a4efa6747d196f0719a70f01da4', '_blank', 'noopener');
	};

	const handleClickPrivacy = () => {
		window.open('https://o4sis.notion.site/29f600ddaab743588efaab094e53d7ff', '_blank', 'noopener');
	};

	const handleClickInstagram = () => {
		window.open('https://www.instagram.com/o4sis_official', '_blank', 'noopener');
	};

	const handleOpenMail = () => {
		window.open('mailto:oasis.yeha@gmail.com', '_blank', 'noopener');
	};

	return (
		<LayoutFooter>
			<FooterOptionList>
				<li>
					<FooterOptionButton onClick={handleClickPrivacy}>개인정보처리방침</FooterOptionButton>
				</li>
				<li>
					<FooterOptionButton onClick={handleClickTerms}>서비스이용약관</FooterOptionButton>
				</li>
			</FooterOptionList>
			<FooterCompanyInfo>
				<ul>
					<li>
						<button onClick={handleClickInstagram} aria-label="오아시스 공식 인스타그램">
							<InstaIcon alt="" />
							oasis__official
						</button>
					</li>
					<li>
						<button onClick={handleOpenMail} aria-label="오아시스 메일">
							<MailIcon alt="" />
							oasis.yeha@gmail.com
						</button>
					</li>
				</ul>
			</FooterCompanyInfo>
			<FooterCopyright>Made by YEHA &gt;</FooterCopyright>
		</LayoutFooter>
	);
};

export default Footer;
