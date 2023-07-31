import Head from 'next/head'
import Home from '@/src/stripe/pages/Home/Home'
import { t } from '@/src/hooks/getLang'

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
