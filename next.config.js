/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		PUBLIC_KEY: process.env.PUBLIC_KEY,
		REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.REACT_APP_SERVER_URL}/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.REACT_APP_SERVER_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig

