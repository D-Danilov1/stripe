import { t } from '@/src/hooks/getLang'
import Success from '@/src/stripe/pages/Success/Success'
import Head from 'next/head'

export default function SuccessPage() {
	return (
		<>
			<Head>
				<title>{t('Payment Next Level Challenge')}</title>
			</Head>
			<Success />
		</>
	)
}
