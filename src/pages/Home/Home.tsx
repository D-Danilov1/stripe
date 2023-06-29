import React, { useState } from 'react'

import Modal from './Modal'

const Home = () => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const price = 17

	return (
		<>
			<div className='container'>
				<h1 className='title'>
					It's time to act, it's time to live life to the fullest!
				</h1>
				<p className='subtitle'>
					Register now and let's do it together, shoulder to shoulder!
				</p>
				<div className='text'>
					<p>{price}$</p>
				</div>
				<button className='button' onClick={() => setModalVisible(true)}>
					Participate
				</button>
			</div>
			<Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</>
	)
}

export default Home
