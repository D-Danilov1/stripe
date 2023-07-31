import { t } from '@/src/hooks/getLang'
import Failed from '@/src/robokassa/pages/Failed/Failed'
import Head from 'next/head'

export default function FailedPage() {
	
	return (
		<>
			<Head>
				<title>{t("Payment NEXT App")}</title>
			</Head>
			<Failed />
		</>
	)
}
