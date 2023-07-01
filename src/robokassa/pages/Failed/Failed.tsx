import Link from 'next/link'
import React from 'react'
import styles from './Failed.module.css'

const Failed = () => {
	return (
		<div className='container'>
			<h1 className={styles.title}>Что-то пошло не так.</h1>
			<Link className={styles.button} href='/'>
				Вернуться на главную страницу
			</Link>
		</div>
	)
}

export default Failed
