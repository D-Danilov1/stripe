import Link from 'next/link'
import React from 'react'
import styles from './Failed.module.css'
import { t } from '@/src/hooks/getLang'
import Image from 'next/image'
import HomeImg from '../../../assets/home_bg.png'

const Failed = () => {
	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='wrapper'>
					<Image src={HomeImg} alt='Igor' draggable={false} className='img' />
				</div>
				<h1 className={styles.title}>{t('Something went wrong.')}</h1>
				<Link className={styles.button} href='/'>
					{t('Go back to main page')}
				</Link>
			</div>
		</div>
	)
}

export default Failed
