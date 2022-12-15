import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(ctx);
			const styleElement = [
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>,
			];
			return {
				...initialProps,
				styles: styleElement,
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<html lang="ko" />
				<Head>
					<link rel="icon" href="/assets/images/favicon/favicon.ico" type="image/x-icon" />
					<link
						rel="preload"
						href="/assets/fonts/NanumSquareRoundL.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/assets/fonts/NanumSquareRoundR.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/assets/fonts/NanumSquareRoundB.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/assets/fonts/NanumSquareRoundEB.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
