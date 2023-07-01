// @ts-nocheck
const backUrl = `${process.env.REACT_APP_SERVER_URL}/api`

export async function callApi(endpoint, method = 'POST', data = {}) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	}

	if (method !== 'GET' && method !== 'HEAD') {
		options.body = JSON.stringify(data)
	}

	const response = await fetch(`${backUrl}${endpoint}`, options)

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}

	return response.json()
}

export async function fetchFindOrCreateUser(data) {
	return callApi('/users', 'POST', data)
}

export async function fetchFindOrCreateSubscribePeriods(data) {
	return callApi('/subscription-periods', 'POST', data)
}

export async function fetchCreateSubscribe(data) {
	return callApi('/subscriptions', 'POST', data)
}

export async function getPaymentLink(data) {
	return callApi('/robokassa/payment-url', 'POST', data)
}

export async function getSuccessPayment(data) {
	return callApi(`/robokassa/success-url?${new URLSearchParams(data)}`, 'GET')
}

export async function getResultPayment(data) {
	return callApi(`/robokassa/result-url?${new URLSearchParams(data)}`, 'GET')
}
