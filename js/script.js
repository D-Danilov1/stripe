import { isValidForm } from './validateForm.js'
import {
	fetchCreatePrice,
	fetchCreateCustomer,
	fetchCreateSubscription,
	productId,
} from './fetchForm.js'

// MODAL

const modal = document.getElementById('myModal')

const btn = document.getElementById('myBtn')

const span = document.getElementsByClassName('close')[0]
btn.onclick = function () {
	modal.style.display = 'block'
}

span.onclick = function () {
	modal.style.display = 'none'
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none'
	}
}
// MODAL END

const plusButton = document.getElementById('plus')
const minusButton = document.getElementById('minus')
const monthsElement = document.getElementById('months')
const priceElement = document.querySelector('.price')

let months = 1
let price = 17

function updateMonthsAndPrice() {
	monthsElement.textContent = months + ' mon.'
	priceElement.textContent = price + ' $.'
}

plusButton.addEventListener('click', function () {
	if (months === 1) {
		months = 3
		price = 34
	} else if (months === 3) {
		months = 6
		price = 51
	} else if (months === 6) {
		months = 12
		price = 85
	}
	updateMonthsAndPrice()
})

minusButton.addEventListener('click', function () {
	if (months === 12) {
		months = 6
		price = 51
	} else if (months === 6) {
		months = 3
		price = 34
	} else if (months === 3) {
		months = 1
		price = 17
	}
	updateMonthsAndPrice()
})

updateMonthsAndPrice()

const user_name = document.querySelector('.user_name')
const user_email = document.querySelector('.user_email')
const user_number = document.querySelector('.user_number')
const submitBtn = document.querySelector('.modal__btn')
submitBtn.addEventListener('click', handleSubmit)

async function handleSubmit(e) {
	e.preventDefault()
	const name = user_name.value
	const email = user_email.value
	const number = user_number.value

	const userData = {
		email,
		number,
		name,
		months,
		price,
	}

	// if (!isValidForm()) return
	// setDefaultForm()
	console.log(months)

	const responsePrice = {
		unit_amount: price * 100,
		currency: 'usd',
		interval: 'month',
		productId: productId,
	}

	if (months === 3) {
		responsePrice.interval_count = 3
	} else if (months === 6) {
		responsePrice.interval_count = 6
	} else if (months === 12) {
		responsePrice.interval = 'year'
	}

	const pricePromise = fetchCreatePrice(responsePrice)

	const customerPromise = fetchCreateCustomer({
		email: email,
		name: name,
		address: {
			city: 'Brothers',
			country: 'US',
			line1: '27 Fredrick Ave',
			postal_code: '97712',
			state: 'CA',
		},
		shipping: {
			address: {
				city: 'Brothers',
				country: 'US',
				line1: '27 Fredrick Ave',
				postal_code: '97712',
				state: 'CA',
			},
			name: name,
		},
	})

	Promise.all([customerPromise, pricePromise])
		.then(responses => Promise.all(responses.map(response => response.json())))
		.then(data => {
			const customerId = data[0].id
			const priceId = data[1].id

			const subscriptionData = {
				customerId,
				priceId,
			}

			return fetchCreateSubscription(subscriptionData)
		})
		.then(response => response.json())
		.then(data => {
			window.location.href = `subscribe.html?clientSecret=${
				data.clientSecret
			}&subscriptionId=${
				data.subscriptionId
			}&email=${email}&period=${months}&amount=${price * 100}`
		})
		.catch(error => {
			console.error(error)
		})
}

function setDefaultForm() {
	user_name.classList.remove('invalid')
	user_email.classList.remove('invalid')
	user_number.classList.remove('invalid')
}
