import React, { useRef } from 'react'
import styles from './Subscribe.module.css'

const Subscribe = (): JSX.Element => {
	const paymentElementRef = useRef<HTMLDivElement | null>(null)
	const errorMessageRef = useRef<HTMLDivElement | null>(null)

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {}

	return (
		<div className='container'>
			<form id='payment-form' onSubmit={handleSubmit}>
				<div ref={paymentElementRef} id='payment-element'></div>
				<button id='submit' className={styles.btn} type='submit'>
					Subscribe
				</button>
				<div ref={errorMessageRef} id='error-message'></div>
			</form>
		</div>
	)
}

export default Subscribe
