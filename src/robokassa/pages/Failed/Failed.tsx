import Link from 'next/link'
import React from 'react'
import styles from './Failed.module.css'
import { t } from '@/src/hooks/getLang'

const Failed = () => {
	return (
		<div className='container'>
			<h1 className={styles.title}>{t('Something went wrong.')}</h1>
			<Link className={styles.button} href='/'>
				{t('Go back to main page')}
			</Link>
		</div>
	)
}

export default Failed
