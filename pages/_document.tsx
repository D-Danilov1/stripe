import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<meta property='og:title' content='Next' />
			<meta property='og:description' content='' />
			<meta property='og:type' content='website' />
			<meta
				property='og:image'
				content='https://static.tildacdn.com/tild3930-3433-4337-b739-656330633965/voitenko-background2.jpg'
			/>
			{/* <meta
				httpEquiv='Content-Security-Policy'
				content='upgrade-insecure-requests'
			/> */}
			<link rel='canonical' href='https://nextworkoutapp.com' />
			<meta name='format-detection' content='telephone=no' />
			{/* <meta httpEquiv='x-dns-prefetch-control' content='on' /> */}
			<link
				rel='shortcut icon'
				href='https://static.tildacdn.com/tild3362-3363-4237-b763-626138306130/favicon_1.ico'
				type='image/x-icon'
			/>
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap'
				type='text/css'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap'
				rel='stylesheet'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
				rel='stylesheet'
			/>
			<title>Payment Next Level Challenge</title>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
