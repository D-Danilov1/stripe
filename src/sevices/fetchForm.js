const backUrl = 'http://localhost:5094/api'
const productId = 'prod_OAEUGP2FAymd0q'

async function callApi(endpoint, method = 'POST', data = {}) {
	const response = await fetch(`${backUrl}${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}

	return response.json()
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
