import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import { en, ru } from '../../../lang'

interface ILangProvider {
	children: React.ReactNode
}
const messages: any = {
	ru,
	en,
}

const LangProvider: FC<ILangProvider> = ({ children }) => {
	const { locale, asPath, push } = useRouter()

	useEffect(() => {
		const lang = Cookies.get('language')
		if (lang) {
			push(asPath, undefined, { locale: JSON.parse(lang).locale })
		}
	}, [])

	if (!locale) return null

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			{children}
		</IntlProvider>
	)
}

export default LangProvider
