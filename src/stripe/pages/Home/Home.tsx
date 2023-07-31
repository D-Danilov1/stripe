import React from "react"

import useHome from "./useHome"
import { t } from "@/src/hooks/getLang"
import Image from "next/image"
import HomeImg from "../../../assets/home_bg.png"

const Home = () => {
	const {
		name,
		email,
		userNameRef,
		userEmailRef,
		handleSubmit,
		setName,
		setEmail,
	} = useHome()

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="wrapper">
					<Image src={HomeImg} alt="Igor" draggable={false} className="img" />
				</div>
				<h2 className="modal__title">{t("Payment NEXT App")}</h2>

				<p className="modal__text">
					{t("Fill in all fields and proceed to payment")}
				</p>
				<form onSubmit={handleSubmit}>
					<div className="modal__input">
						<p>{t("Your name")}</p>
						<input
							type="text"
							className="name"
							value={name}
							ref={userNameRef}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="modal__input">
						<p>{t("Your email")}</p>
						<input
							type="text"
							className="user_email"
							value={email}
							ref={userEmailRef}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<button type="submit" className="modal__btn">
						{t("Go to the payment")}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Home
