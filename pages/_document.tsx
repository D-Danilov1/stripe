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
			<link
				rel='shortcut icon'
				href='https://static.tildacdn.com/tild3362-3363-4237-b763-626138306130/favicon_1.ico'
				type='image/x-icon'
			/>
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' />
			<link
				href='https://fonts.googleapis.com/css2?family=Manrope:wght@500;600&display=swap'
				rel='stylesheet'
			/>

			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
