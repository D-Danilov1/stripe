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
		monthsElementRef,
		priceElementRef,
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
		<div
			id='myModal'
			className='modal'
			style={{ display: modalVisible ? 'block' : 'none' }}
		>
			<div className='close' onClick={() => setModalVisible(false)} />
			<div className='modal-content' ref={modalRef}>
				<h2 className='modal__title'>
					Payment for participation in the Next Level Challenge
				</h2>
				<div className='counter'>
					<p className='counter__title'>Next Level Challenge</p>
					<div className='counter__menu'>
						<div onClick={handleMinusClick}>
							<MinusSvg />
						</div>
						<p id='months' ref={monthsElementRef}>
							{months} mon.
						</p>
						<div onClick={() => handlePlusClick()}>
							<PlusSvg />
						</div>
					</div>
					<p className='price' ref={priceElementRef}>
						{price}$
					</p>
				</div>
				<p className='modal__text'>Fill in all fields and proceed to payment</p>
				<form onSubmit={handleSubmit}>
					<div className='modal__input'>
						<p>Your name</p>
						<input
							type='text'
							className='user_name'
							value={name}
							ref={userNameRef}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>Your email</p>
						<input
							type='text'
							className='user_email'
							value={email}
							ref={userEmailRef}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='modal__input'>
						<p>Your phone number</p>
						<input
							type='text'
							className='user_number'
							value={number}
							ref={userNumberRef}
							onChange={e => setNumber(e.target.value)}
						/>
					</div>
					<button type='submit' className='modal__btn'>
						Go to the payment
					</button>
				</form>
			</div>
		</div>
	)
}

export default Modal
