import { useState, useRef } from 'react'
import { getPaymentLink } from '../../service/fetchForm'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const useHome = () => {
	const router = useRouter()
	const [months, setMonths] = useState<number>(1)
	const [price, setPrice] = useState<number>(1450)
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [number, setNumber] = useState<string>('')

	const userNameRef = useRef<any>(null)
	const userEmailRef = useRef<any>(null)
	const userNumberRef = useRef<any>(null)

	const updateMonthsAndPrice = (months: number, price: number) => {
		setMonths(months)
		setPrice(price)
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
		try {
			const { response: paymentLink } = await getPaymentLink({
				amount: price,
			})
			await Cookies.set('email', email)
			await Cookies.set('amount', String(price))
			await Cookies.set('period', String(months))

			router.push(paymentLink)
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
			updatedMonths += 5
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
			updatedPrice = 4350
		} else if (months === 6) {
			updatedMonths -= 5
			updatedPrice = 1450
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
