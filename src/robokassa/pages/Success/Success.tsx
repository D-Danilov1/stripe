import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './Success.module.css'
import {
	fetchCreateSubscribe,
	fetchFindOrCreateSubscribePeriods,
	fetchFindOrCreateUser,
	getResultPayment,
	getSuccessPayment,
} from '../../service/fetchForm'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Success = () => {
	const { query } = useRouter()

	useEffect(() => {
		if (!query) return
		const fetchData = async () => {
			if (!query?.SignatureValue || !query?.InvId || !query?.OutSum) return

			try {
				const userEmail = await Cookies.get('email')
				const amount = await Cookies.get('amount')
				const period = await Cookies.get('period')

				const resultPaymentResponse = await getResultPayment(query)
				const successPaymentResponse = await getSuccessPayment(query)

				if (!userEmail || !amount || !period)
					return console.log('keys invalid', userEmail, amount, period)

				if (resultPaymentResponse && successPaymentResponse) {
					const userObj = {
						email: userEmail,
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
						userEmail: userEmail,
						subscription_period_id: subscriptionPeriod.response.id,
						payment_amount: Number(amount),
						start_of: new Date().toISOString(),
						end_of: calculateEndDate(new Date(), period),
					}

					await fetchCreateSubscribe(subscriptionObj)
					console.log('success')
				} else {
					console.log(
						'Payment failed',
						resultPaymentResponse,
						successPaymentResponse
					)
				}
			} catch (error) {
				console.log('Error 123:', error)
			}
		}

		fetchData()
	}, [query])
	return (
		<div className='container'>
			<h1 className={styles.title}>Спасибо за оплату!</h1>
			<Link className={styles.button} href='/'>
				Вернуться на главную страницу
			</Link>
		</div>
	)
}

export default Success
