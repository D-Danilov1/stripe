import { useState, useRef } from 'react'
import { getPaymentLink } from '../../service/fetchForm'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const useHome = () => {
	const router = useRouter()
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')

	const userNameRef = useRef<any>(null)
	const userEmailRef = useRef<any>(null)

	const isValidForm = () => {
		const name = userNameRef.current.value
		const email = userEmailRef.current.value

		const isValName = isValidName(name)
		const isValEmail = isValidEmail(email)
		return isValEmail && isValName
	}

	const isValidName = (name: string) => {
		const usernameRegex = /^[\p{L}\s]{3,}$/u
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



	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!isValidForm()) return
		setDefaultForm()
		try {
			await Cookies.set('email', email)
			const price = await Cookies.get('amount')
			const months = await Cookies.get('period')

			const { response: paymentLink } = await getPaymentLink({
				amount: price,
				period: months,
			})

			await router.push(paymentLink)
		} catch (error) {
			console.log('error', error)
		}
	}

	const setDefaultForm = () => {
		userNameRef.current.classList.remove('invalid')
		userEmailRef.current.classList.remove('invalid')
	}

	return {
		name,
		email,
		userNameRef,
		userEmailRef,
		handleSubmit,
		setDefaultForm,
		isValidForm,
		setName,
		setEmail,
	}
}

export default useHome
