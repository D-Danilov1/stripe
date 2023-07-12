import React, { useEffect, useRef, useState } from 'react'
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import styles from './Subscribe.module.css'
import Cookies from 'js-cookie'

const stripePromise = loadStripe(process.env.PUBLIC_KEY || '')

const Subscribe = (): JSX.Element => {
	const { query } = useRouter()
	const paymentElementRef = useRef<HTMLDivElement | null>(null)
	const errorMessageRef = useRef<HTMLDivElement | null>(null)
	const [stripeElements, setStripeElements] = useState<StripeElements | null>(
		null
	)

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
		//localhost:3000/subscribe?clientSecret=pi_3NSuQdHb8NpiNcYO0BM3Hge6_secret_phzRoHLvgINu7L6C4oLqFYW7h&subscriptionId=sub_1NSuQcHb8NpiNcYOojZvPEKm&email=test@mail.ru&period=1&amount=1700&tel=79829472886
		await Cookies.set('clientSecret', String(query.clientSecret))
		await Cookies.set('subscriptionId', String(query.subscriptionId))
		await Cookies.set('email', String(query.email))
		await Cookies.set('period', String(query.period))
		await Cookies.set('amount', String(query.amount))
		await Cookies.set('tel', String(query.tel))

		const { error } = await stripe.confirmPayment({
			elements: stripeElements,
			confirmParams: {
				return_url: `https://www.next-payment.site/success`,
			},
		})

		if (error && errorMessageRef?.current) {
			errorMessageRef.current.textContent = error.message
		}
	}

	return (
		<div className={styles.container}>
			<form id='payment-form' onSubmit={handleSubmit}>
				<div
					ref={paymentElementRef}
					id='payment-element'
					className={styles.form}
				></div>
				<button id='submit' className={styles.btn} type='submit'>
					Subscribe
				</button>
				<div ref={errorMessageRef} id='error-message'></div>
			</form>
		</div>
	)
}

export default Subscribe
