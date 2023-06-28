const backUrl = 'http://localhost:5010/api/stripe'
const productId = 'prod_O9tqK013ME5dru'

function fetchCreatePrice(data) {
	return fetch(`${backUrl}/create-price`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchCreateCustomer(data) {
	return fetch(`${backUrl}/create-customer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function fetchCreateSubscription(data) {
	return fetch(`${backUrl}/create-subscription`, {
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
	productId,
}
