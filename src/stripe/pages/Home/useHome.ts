import { useState, useRef } from "react"
import {
	fetchCreatePrice,
	fetchCreateCustomer,
	fetchCreateSubscription,
	productId,
} from "../../sevices/fetchForm"

import { useRouter } from "next/router"
import Cookies from "js-cookie"

const useHome = () => {
	const router = useRouter()
	const { locale } = useRouter()
	const [name, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")

	const userNameRef = useRef<any>(null)
	const userEmailRef = useRef<any>(null)

	const isValidForm = () => {
		const isValName = isValidName(name)
		const isValEmail = isValidEmail(email)

		return isValEmail && isValName
	}

	const isValidName = (name: string) => {
		const usernameRegex = /^[\p{L}\s]{3,}$/u
		const isValid = usernameRegex.test(name)
		if (!isValid) {
			userNameRef.current.classList.add("invalid")
		} else {
			userNameRef.current.classList.remove("invalid")
		}
		return isValid
	}

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const isValid = emailRegex.test(email)
		if (!isValid) {
			userEmailRef.current.classList.add("invalid")
		} else {
			userEmailRef.current.classList.remove("invalid")
		}
		return isValid
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!isValidForm()) return
		setDefaultForm()

		const price = await Cookies.get("amount")
		const months = await Cookies.get("period")

		if (price || months) {
			console.log("Error")
		}

		const responsePrice: any = {
			unit_amount: Number((Number(price) * 100).toFixed(2)),
			currency: "usd",
			interval: "month",
			productId: productId,
		}

		if (Number(months) === 6) {
			responsePrice.interval_count = 6
		} else if (Number(months) === 12) {
			responsePrice.interval = "year"
		}

		try {
			const [customerResponse, priceResponse] = await Promise.all([
				fetchCreateCustomer({
					email: email,
					name: name,
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
				`/${locale}/stripe/subscribe?clientSecret=${
					subscribeResponse.clientSecret
				}&subscriptionId=${
					subscribeResponse.subscriptionId
				}&email=${email}&period=${months}&amount=${
					Number(price) * 100
				}`
			)
		} catch (error) {
			console.log(error)
		}
	}

	const setDefaultForm = () => {
		userNameRef.current.classList.remove("invalid")
		userEmailRef.current.classList.remove("invalid")
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
