import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './Success.module.css'
import {
	fetchCreateSubscribe,
	fetchFindOrCreateSubscribePeriods,
	fetchFindOrCreateUser,
} from '@/src/sevices/fetchForm'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import Cookies from 'js-cookie'

const stripePromise = loadStripe(process.env.PUBLIC_KEY || '')

const Success = () => {
	const { query } = useRouter()
	useEffect(() => {
		const fetchData = async () => {
			const stripe: any = await stripePromise
			const secret = await Cookies.get('clientSecret')
			const subscriptionId = await Cookies.get('subscriptionId')
			const email = await Cookies.get('email')
			const period = await Cookies.get('period')
			const amount = await Cookies.get('amount')
			const tel = await Cookies.get('tel')

			if (
				!secret ||
				!email ||
				!period ||
				!amount ||
				!stripe ||
				!subscriptionId ||
				!tel
			) {
				return console.log('invalid keys')
			} else {
			}
			try {
				const { paymentIntent } = await stripe.retrievePaymentIntent(
					String(secret)
				)
				console.log(paymentIntent?.status)

				if (paymentIntent?.status == 'succeeded') {
					const userObj = {
						email: email,
						phone_number: tel,
					}
					await fetchFindOrCreateUser(userObj)

					const calculateEndDate = (startDate: any, period: any) => {
						const endDate = new Date(startDate)
						endDate.setMonth(endDate.getMonth() + Number(period))
						return endDate.toISOString()
					}

					const subscriptionPeriodObj = {
						name: `${period}_MONTH${Number(period) > 1 ? 'S' : ''}`,
						period: Number(period),
					}

					const subscriptionPeriod = await fetchFindOrCreateSubscribePeriods(
						subscriptionPeriodObj
					)

					const subscriptionObj = {
						userEmail: email,
						subscription_period_id: subscriptionPeriod.response.id,
						payment_amount: Number(amount),
						start_of: new Date().toISOString(),
						end_of: calculateEndDate(new Date(), period),
						subscriptionId: subscriptionId,
					}

					await fetchCreateSubscribe(subscriptionObj)
				} else {
					console.log('Payment failed')
				}
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchData()
	}, [query])

	return (
		<div className='container'>
			<h1 className={styles.title}>Thanks for the payment!</h1>
			<Link className={styles.button} href='/'>
				Go back to main page
			</Link>
		</div>
	)
}

export default Success
