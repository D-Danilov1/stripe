import Head from 'next/head'
import Subscribe from '@/src/stripe/pages/Subscribe/Subscribe'
import { t } from '@/src/hooks/getLang'

export default function SubscribePage() {
	return (
		<>
			<Head>
				<title>{t("Payment NEXT App")}</title>
			</Head>
			<Subscribe />
		</>
	)
}
