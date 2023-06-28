import {
	fetchCreateSubscribe,
	fetchFindOrCreateSubscribePeriods,
	fetchFindOrCreateUser,
} from './fetchForm.js'

const stripe = Stripe(
	'pk_test_51KtvkHHb8NpiNcYO3CtFBcLoOlHmOhUuWLSnUKcT64WN9lic66astdDy6agkwa1tHWd5cFb72HkKq31lQ0izj9c700awlcSfka'
)

const clientSecret = new URLSearchParams(window.location.search).get(
	'payment_intent_client_secret'
)
const email = new URLSearchParams(window.location.search).get('email')
const period = new URLSearchParams(window.location.search).get('period')
const paymentAmount = new URLSearchParams(window.location.search).get('amount')

stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
	if (paymentIntent.status === 'succeeded') {
		if (!clientSecret || !email || !period || !paymentAmount) {
			console.error('error: Invalid keys')
			return
		}

		const userObj = {
			email: email,
		}

		let user
		try {
			const response = await fetchFindOrCreateUser(userObj)
			user = await response.json()
		} catch (error) {
			console.error(error)
			throw error
		}

		// function calculateEndDate(startDate, period) {
		// 	const endDate = new Date(startDate)
		// 	endDate.setMonth(endDate.getMonth() + Number(period))
		// 	return endDate.toISOString()
		// }

		// const subscriptionPeriodObj = {
		// 	name: `${period}_MONTH${period > 1 ? 'S' : ''}`,
		// 	period: Number(period),
		// }

		// let subscriptionPeriod
		// try {
		// 	const response = await fetchFindOrCreateSubscribePeriods(
		// 		subscriptionPeriodObj
		// 	)
		// 	subscriptionPeriod = await response.json()
		// } catch (error) {
		// 	console.error(error)
		// 	throw error
		// }

		// const subscriptionObj = {
		// 	userEmail: email,
		// 	subscription_period_id: subscriptionPeriod.response.id,
		// 	payment_amount: Number(paymentAmount),
		// 	start_of: new Date().toISOString(),
		// 	end_of: calculateEndDate(new Date(), period),
		// }

		// let subscription
		// try {
		// 	const response = await fetchCreateSubscribe(subscriptionObj)
		// 	subscription = await response.json()
		// 	console.log(subscription)
		// } catch (error) {
		// 	console.error(error)
		// 	throw error
		// }
	}
})
