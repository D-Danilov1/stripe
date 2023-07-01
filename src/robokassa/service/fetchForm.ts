// @ts-nocheck

const backUrl = `${process.env.REACT_APP_SERVER_URL}/api`

export async function callApi(endpoint, method = 'POST', data = {}) {
	const config = {
		method,
		url: `${backUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	}

	try {
		const response = await axios(config)

		if (!response.status === 200) {
			throw new Error(`API request failed with status ${response.status}`)
		}

		return response.data
	} catch (error) {
		throw new Error(`API request failed with error: ${error.message}`)
	}
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
	const queryString = new URLSearchParams(data).toString()
	return callApi(`/robokassa/success-url?${queryString}`, 'GET')
}

export async function getResultPayment(data) {
	const queryString = new URLSearchParams(data).toString()
	return callApi(`/robokassa/result-url?${queryString}`, 'GET')
}
