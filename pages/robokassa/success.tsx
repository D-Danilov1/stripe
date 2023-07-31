import { t } from '@/src/hooks/getLang'
import Success from '@/src/robokassa/pages/Success/Success'
import Head from 'next/head'

export default function SuccessPage() {
	return (
		<>
			<Head>
				<title>{t("Payment NEXT App")}</title>
			</Head>
			<Success />
		</>
	)
}
