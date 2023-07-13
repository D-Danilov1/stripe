import React from 'react'
import useHome from './useHome'
import { t } from '@/src/hooks/getLang'

const Home = () => {
	const {
		name,
		email,
		number,
		userNameRef,
		userEmailRef,
		userNumberRef,
		handleSubmit,
		setName,
		setNumber,
		setEmail,
	} = useHome()

	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2 className='modal__title'>{t('Payment Next Level Challenge')}</h2>

				<p className='modal__text'>
					{t('Fill in all fields and proceed to payment')}
				</p>
				<form onSubmit={handleSubmit}>
					<div className='modal__input'>
						<p>{t('Your name')}</p>
						<input
							type='text'
							className='user_name'
							value={name}
							ref={userNameRef}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>{t('Your email')}</p>
						<input
							type='text'
							className='user_email'
							value={email}
							ref={userEmailRef}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>{t('Your tel')}</p>
						<input
							type='text'
							className='user_number'
							value={number}
							ref={userNumberRef}
							onChange={e => setNumber(e.target.value)}
						/>
					</div>
					<button type='submit' className='modal__btn'>
						{t('Go to the payment')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Home
