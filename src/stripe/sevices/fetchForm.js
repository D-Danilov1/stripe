import axios from 'axios'

const backUrl = `${process.env.REACT_APP_SERVER_URL}/api`
const productId = process.env.STRIPE_PRODUCT_ID

async function callApi(endpoint, method = 'POST', data = {}) {
	try {
		const response = await axios({
			method,
			url: `${backUrl}${endpoint}`,
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		})

		if (!response.status === 200) {
			throw new Error(`API request failed with status ${response.status}`)
		}

		return response.data
	} catch (error) {
		throw new Error(`API request failed with error: ${error.message}`)
	}
}

async function fetchCreatePrice(data) {
	return callApi('/stripe/create-price', 'POST', data)
}

async function fetchCreateCustomer(data) {
	return callApi('/stripe/create-customer', 'POST', data)
}

async function fetchCreateSubscription(data) {
	return callApi('/stripe/create-subscription', 'POST', data)
}

async function fetchFindOrCreateUser(data) {
	return callApi('/users', 'POST', data)
}

async function fetchFindOrCreateSubscribePeriods(data) {
	return callApi('/subscription-periods', 'POST', data)
}

async function fetchCreateSubscribe(data) {
	return callApi('/subscriptions', 'POST', data)
}

export {
	fetchCreatePrice,
	fetchCreateCustomer,
	fetchCreateSubscription,
	fetchFindOrCreateUser,
	fetchFindOrCreateSubscribePeriods,
	fetchCreateSubscribe,
	productId,
}
