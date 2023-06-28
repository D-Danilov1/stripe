const backUrl = 'http://localhost:5010/api'
const productId = 'prod_OAEUGP2FAymd0q'

function fetchCreatePrice(data) {
	return fetch(`${backUrl}/stripe/create-price`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchCreateCustomer(data) {
	return fetch(`${backUrl}/stripe/create-customer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchCreateSubscription(data) {
	return fetch(`${backUrl}/stripe/create-subscription`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchFindOrCreateUser(data) {
	return fetch(`${backUrl}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchFindOrCreateSubscribePeriods(data) {
	return fetch(`${backUrl}/subscription-periods`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchCreateSubscribe(data) {
	return fetch(`${backUrl}/subscriptions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
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
