import React, { useState } from 'react'

import Modal from './Modal'

const Home = () => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const price = 1450

	return (
		<>
			<div className='container'>
				<h1 className='title'>
					Пришло время действовать, пришло время жить на полную!
				</h1>
				<p className='subtitle'>
					Регистрируйся прямо сейчас и давай сделаем это вместе, плечом к плечу!
				</p>
				<div className='text'>
					<p>{price}р</p>
				</div>
				<button className='button' onClick={() => setModalVisible(true)}>
					Принять участие
				</button>
			</div>
			<Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</>
	)
}

export default Home
