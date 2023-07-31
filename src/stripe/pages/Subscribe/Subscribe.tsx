import React, { useEffect, useRef, useState } from 'react'
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import styles from './Subscribe.module.css'
import Cookies from 'js-cookie'
import { t } from '@/src/hooks/getLang'
import { Audio, Oval } from 'react-loader-spinner'

const stripePromise = loadStripe(process.env.PUBLIC_KEY || '')

const Subscribe = (): JSX.Element => {
	const { query, locale } = useRouter()
	const paymentElementRef = useRef<HTMLDivElement | null>(null)
	const errorMessageRef = useRef<HTMLDivElement | null>(null)
	const [stripeElements, setStripeElements] = useState<StripeElements | null>(
		null
	)
	const [loading, setLoading] = useState(true) // Add a loading state

	useEffect(() => {
		const initializeStripeElements = async () => {
			const stripe: Stripe | null = await stripePromise

			if (!stripe || !query.clientSecret) return

			const options: any = {
				clientSecret: query.clientSecret,
				appearance: {},
			}

			const elements = stripe.elements(options)
			setStripeElements(elements)

			const paymentElement = elements.create('payment')
			await paymentElement.mount(paymentElementRef.current!)

			setLoading(false)
		}

		initializeStripeElements()
	}, [query, stripePromise])

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()

		if (!paymentElementRef.current || !stripeElements) {
			return
		}

		const stripe: Stripe | null | any = await stripePromise
		// @ts-ignore
		if (!stripe) return null
		await Cookies.set('clientSecret', String(query.clientSecret))
		await Cookies.set('subscriptionId', String(query.subscriptionId))
		await Cookies.set('email', String(query.email))
		await Cookies.set('period', String(query.period))
		await Cookies.set('amount', String(query.amount))

		const { error } = await stripe.confirmPayment({
			elements: stripeElements,
			confirmParams: {
				return_url: `https://www.next-payment.site/${locale}/stripe/success`,
			},
		})

		if (error && errorMessageRef?.current) {
			errorMessageRef.current.textContent = error.message
		}
	}
	console.log(loading)

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className={styles.container}>
					<form id='payment-form' onSubmit={handleSubmit}>
						{loading && (
							<div className={styles.spinner}>
								<Oval
									height={80}
									width={80}
									color='#73cbd0'
									wrapperStyle={{}}
									wrapperClass=''
									visible={true}
									ariaLabel='oval-loading'
									secondaryColor='#73cbd0'
									strokeWidth={2}
									strokeWidthSecondary={2}
								/>
							</div>
						)}
						<div
							ref={paymentElementRef}
							id='payment-element'
							className={styles.form}
						></div>
						<button id='submit' className={styles.btn} type='submit'>
							{t('Subscribe')}
						</button>
						<div ref={errorMessageRef} id='error-message'></div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Subscribe
