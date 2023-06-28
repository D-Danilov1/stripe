const stripe = Stripe(
	// 'pk_test_51KtvkHHb8NpiNcYO3CtFBcLoOlHmOhUuWLSnUKcT64WN9lic66astdDy6agkwa1tHWd5cFb72HkKq31lQ0izj9c700awlcSfka'
	'pk_live_51KtvkHHb8NpiNcYOuoVziozoU82Oh0xWWbWztIK4VqZC3yipfU73A98GEgJqN88FTBStVtnQwOEnQ3Swxpwd4efg00QQelP0XK'
)
const urlParams = new URLSearchParams(window.location.search)

const clientSecret = urlParams.get('clientSecret')
const subscriptionId = urlParams.get('subscriptionId')

const options = {
	clientSecret: clientSecret,
	appearance: {},
}

const elements = stripe.elements(options)

const paymentElement = elements.create('payment')
paymentElement.mount('#payment-element')

const form = document.getElementById('payment-form')

form.addEventListener('submit', async event => {
	event.preventDefault()

	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			return_url: 'http://127.0.0.1:5500/da/success.html', // TODO URL STIE
		},
	})

	if (error) {
		const messageContainer = document.querySelector('#error-message')
		messageContainer.textContent = error.message
	} else {
	}
})
stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
	const message = document.querySelector('#message')
	switch (paymentIntent.status) {
		case 'succeeded':
			message.innerText = 'Success! Payment received.'
			break

		case 'processing':
			message.innerText =
				"Payment processing. We'll update you when payment is received."
			break

		case 'requires_payment_method':
			message.innerText = 'Payment failed. Please try another payment method.'
			break

		default:
			message.innerText = 'Something went wrong.'
			break
	}
})
