import { t } from '@/src/hooks/getLang'
import Home from '@/src/robokassa/pages/Home/Home'
import Head from 'next/head'

export default function HomePage() {
	return (
		<>
			<Head>
				<title>{t("Payment NEXT App")}</title>
			</Head>
			<Home />
		</>
	)
}
