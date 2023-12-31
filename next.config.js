/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		PUBLIC_KEY: process.env.PUBLIC_KEY,
		REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
		REACT_APP_URL: process.env.REACT_APP_URL,
		STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ['ru', 'en'],
		defaultLocale: 'en',
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: `${process.env.REACT_APP_SERVER_URL}/:path*`,
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
