/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		PUBLIC_KEY: process.env.PUBLIC_KEY,
	},
}

module.exports = nextConfig
