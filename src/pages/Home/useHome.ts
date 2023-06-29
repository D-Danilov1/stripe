import { useState, useRef } from 'react'
import {
	fetchCreatePrice,
	fetchCreateCustomer,
	fetchCreateSubscription,
	productId,
} from '../../sevices/fetchForm'
import { useRouter } from 'next/router'
const useHome = () => {
	const router = useRouter()
	const [months, setMonths] = useState<number>(1)
	const [price, setPrice] = useState<number>(17)
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [number, setNumber] = useState<string>('')

	const monthsElementRef = useRef<any>(null)
	const priceElementRef = useRef<any>(null)
	const userNameRef = useRef<any>(null)
	const userEmailRef = useRef<any>(null)
	const userNumberRef = useRef<any>(null)

	const updateMonthsAndPrice = (months: number, price: number) => {
		if (monthsElementRef.current && priceElementRef.current) {
			monthsElementRef.current.textContent = `${months} mon.`
			priceElementRef.current.textContent = `${price} $.`
		}
	}

	const isValidForm = () => {
		const name = userNameRef.current.value
		const email = userEmailRef.current.value
		const number = userNumberRef.current.value

		const isValName = isValidName(name)
		const isValEmail = isValidEmail(email)
		const isValNumber = isValidNumber(number)

		return isValEmail && isValNumber && isValName
	}

	const isValidName = (name: string) => {
		const usernameRegex = /^[a-zA-Za-яА-Я]{3,}$/
		const isValid = usernameRegex.test(name)
		if (!isValid) {
			userNameRef.current.classList.add('invalid')
		} else {
			userNameRef.current.classList.remove('invalid')
		}
		return isValid
	}

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const isValid = emailRegex.test(email)
		if (!isValid) {
			userEmailRef.current.classList.add('invalid')
		} else {
			userEmailRef.current.classList.remove('invalid')
		}
		return isValid
	}

	const isValidNumber = (phoneNumber: string) => {
		const phoneRegex =
			/^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
		const isValid = phoneRegex.test(phoneNumber)
		if (!isValid) {
			userNumberRef.current.classList.add('invalid')
		} else {
			userNumberRef.current.classList.remove('invalid')
		}
		return isValid
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!isValidForm()) return
		setDefaultForm()

		const responsePrice: any = {
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

		try {
			const [customerResponse, priceResponse] = await Promise.all([
				fetchCreateCustomer({
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
				}),
				fetchCreatePrice(responsePrice),
			])

			const customerId = customerResponse.id
			const priceId = priceResponse.id

			const subscriptionData = {
				customerId,
				priceId,
			}

			const subscribeResponse = await fetchCreateSubscription(subscriptionData)
			router.push(
				`/subscribe?clientSecret=${
					subscribeResponse.clientSecret
				}&subscriptionId=${
					subscribeResponse.subscriptionId
				}&email=${email}&period=${months}&amount=${price * 100}`
			)
		} catch (error) {
			console.log('error', error)
		}
	}

	const setDefaultForm = () => {
		userNameRef.current.classList.remove('invalid')
		userEmailRef.current.classList.remove('invalid')
		userNumberRef.current.classList.remove('invalid')
	}

	const handlePlusClick = () => {
		let updatedMonths = months
		let updatedPrice = price

		if (months === 1) {
			updatedMonths += 2
			updatedPrice *= 2
		} else if (months === 3) {
			updatedMonths += 3
			updatedPrice *= 2
		} else if (months === 6) {
			updatedMonths += 6
			updatedPrice *= 2
		}

		setMonths(updatedMonths)
		setPrice(updatedPrice)
		updateMonthsAndPrice(updatedMonths, updatedPrice)
	}

	const handleMinusClick = () => {
		let updatedMonths = months
		let updatedPrice = price

		if (months === 12) {
			updatedMonths -= 6
			updatedPrice = 51
		} else if (months === 6) {
			updatedMonths -= 3
			updatedPrice = 34
		} else if (months === 3) {
			updatedMonths -= 2
			updatedPrice = 17
		}

		setMonths(updatedMonths)
		setPrice(updatedPrice)
		updateMonthsAndPrice(updatedMonths, updatedPrice)
	}

	return {
		months,
		price,
		name,
		email,
		number,
		monthsElementRef,
		priceElementRef,
		userNameRef,
		userEmailRef,
		userNumberRef,
		handleSubmit,
		setDefaultForm,
		isValidForm,
		setName,
		setNumber,
		setEmail,
		updateMonthsAndPrice,
		setPrice,
		setMonths,
		handleMinusClick,
		handlePlusClick,
	}
}

export default useHome
