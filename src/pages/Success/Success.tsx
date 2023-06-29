import Link from 'next/link'
import React from 'react'
import styles from './Success.module.css'

const Success = () => {
	return (
		<div className='container'>
			<h1 className={styles.title}>Thanks for the payment!</h1>
			<Link className={styles.button} href='/'>
				Go back to main page
			</Link>
		</div>
	)
}

export default Success
