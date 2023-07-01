import React, { useEffect, useRef } from 'react'
import MinusSvg from './MinusSvg'
import PlusSvg from './PlusSvg'
import useHome from './useHome'

const Modal = ({ modalVisible, setModalVisible }: any) => {
	const {
		months,
		price,
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
		handleMinusClick,
		handlePlusClick,
	} = useHome()

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setModalVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [setModalVisible])

	return (
		<div className='modal' style={{ display: modalVisible ? 'block' : 'none' }}>
			<div className='close' onClick={() => setModalVisible(false)} />
			<div className='modal-content' ref={modalRef}>
				<h2 className='modal__title'>Оплата участия в Next Level Challenge</h2>
				<div className='counter'>
					<p className='counter__title'>Next Level Challenge</p>
					<div className='counter__menu'>
						<div onClick={handleMinusClick}>
							<MinusSvg />
						</div>
						<p>{months} мес.</p>
						<div onClick={() => handlePlusClick()}>
							<PlusSvg />
						</div>
					</div>
					<p className='price'>{price} р.</p>
				</div>
				<p className='modal__text'>Заполните все поля и переходите к оплате</p>
				<form onSubmit={handleSubmit}>
					<div className='modal__input'>
						<p>Ваше Имя</p>
						<input
							type='text'
							className='user_name'
							value={name}
							ref={userNameRef}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>Ваш Email</p>
						<input
							type='text'
							className='user_email'
							value={email}
							ref={userEmailRef}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>Ваш Телефон</p>
						<input
							type='text'
							className='user_number'
							value={number}
							ref={userNumberRef}
							onChange={e => setNumber(e.target.value)}
						/>
					</div>
					<button type='submit' className='modal__btn'>
						Перейти к оплате
					</button>
				</form>
			</div>
		</div>
	)
}

export default Modal
