import React, { useState } from "react"
import styles from "./Home.module.css"
import Image from "next/image"
import HomeImg from "../assets/home_bg.png"
import { t } from "../hooks/getLang"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import Arrow from "../assets/Arrow.svg"

const price12R = "3990"
const price3R = "2990"
const priceR = "599"
const price12 = "44.90"
const price3 = "33.90"
const price = "0.99"

const Home = () => {
	const { locale, push } = useRouter()
	const [isShowPayments, setShowPayments] = useState(false)

	const handlePayment = async (amount: string, period: string) => {
		if (locale == "ru") {
			if (amount === price12) {
				await Cookies.set("amount", price12R)
			}
			if (amount === price3) {
				await Cookies.set("amount", price3R)
			}
			if (amount === price) {
				await Cookies.set("amount", priceR)
			}

			await Cookies.set("period", period)

			setShowPayments(true)
		}

		if (locale !== "ru") {
			if (amount == price12) {
				await Cookies.set("amount", price12)
			}
			if (amount == price3) {
				await Cookies.set("amount", price3)
			}
			if (amount == price) {
				await Cookies.set("amount", price)
			}
			return await push("/en/stripe")
		}
	}

	const goToMain = async () => {
		setShowPayments(false)
		await Cookies.remove("period")
		await Cookies.remove("amount")
	}

	const handlePaymentRF = async () => {
		const amount = Cookies.get("amount")

		if (amount === price12) {
			await Cookies.set("amount", price12R)
		}
		if (amount === price3) {
			await Cookies.set("amount", price3R)
		}
		if (amount === price) {
			await Cookies.set("amount", priceR)
		}

		push("/robokassa")
	}
	const handlePaymentForeign = async () => {
		const amount = Cookies.get("amount")

		if (amount === price12R) {
			await Cookies.set("amount", price12)
		}
		if (amount === price3R) {
			await Cookies.set("amount", price3)
		}
		if (amount === priceR) {
			await Cookies.set("amount", price)
		}
		push(`/${locale}/stripe`)
	}

	return (
		<div className="modal">
			<div className={styles.modal_content}>
				<div className={styles.wrapper}>
					<Image
						src={HomeImg}
						alt="Igor"
						draggable={false}
						className={styles.img}
					/>
				</div>
				{!isShowPayments ? (
					<>
						<h2 className={styles.title}>
							{t("Ready to take your shape and life to the next level?")}
						</h2>
						<p className={styles.text}>
							{t("Choose the subscription option and see you inside!")}
						</p>
						<div className={styles.boxes}>
							<div
								className={styles.box}
								onClick={() => handlePayment(price12, "12")}
							>
								<div className={styles.top}>
									<p> {t("Profitable")}</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="19"
										viewBox="0 0 16 19"
										fill="none"
									>
										<path
											d="M13.9731 5.01649L13.1315 3.76513C12.8871 3.35975 12.4256 3.10417 11.8645 3.08655C11.3577 3.08655 10.8781 3.32449 10.6156 3.69461L10.2808 4.1617L8.73327 1.30646C8.25364 0.513336 6.97763 0.328248 6.25364 1.05968L2.22648 5.45711C0.787567 6.98167 0.000244141 8.91165 0.000244141 10.8945C0.000244141 11.2381 0.0545351 11.6523 0.190282 12.2604C0.217431 12.3661 0.244586 12.4807 0.280785 12.6041L0.326023 12.8068C1.1586 15.8118 4.12695 17.9797 7.75591 18.2H7.81021C11.5297 18.2 14.8419 15.944 15.6654 12.842C15.7107 12.7186 15.7378 12.5953 15.774 12.4719C15.7921 12.4014 15.8102 12.3309 15.8464 12.1987C15.955 11.6699 16.0002 11.2734 16.0002 10.9562V10.8416C16.0002 8.79709 14.9595 6.48817 13.9731 5.01649ZM10.4165 14.6045C10.3984 14.6662 10.3803 14.7279 10.3622 14.7984L10.3441 14.8777C10.1631 15.5386 9.63825 16.0938 8.90522 16.4023C8.56133 16.5521 8.19933 16.6314 7.81924 16.6578H7.78306C7.50252 16.6578 7.18577 16.5609 6.81473 16.4023C6.09074 16.0938 5.56584 15.5386 5.3577 14.7984C5.3396 14.7279 5.33057 14.6574 5.32152 14.6485C5.28532 14.4635 5.25816 14.3313 5.25816 14.2432C5.25816 13.5646 5.53869 12.9037 6.03643 12.375L7.8645 10.3833L9.69255 12.3838C10.1903 12.9037 10.4618 13.5646 10.4618 14.2432C10.4618 14.3313 10.4437 14.4723 10.4165 14.6045Z"
											fill="#FAFAFA"
										/>
									</svg>
								</div>
								<div>
									<p className={styles.box__title}>{t("Subscription")}</p>
									<p className={styles.box__subtitle}>{t("12 months")}</p>
								</div>
								<div>
									<p className={styles.box__title}>{t("discount 75%")}</p>
									<p className={styles.box__subtitle}>
										<span>{t("$360")}</span>
										{t("$44.90")}
									</p>
								</div>
							</div>
							<div
								className={styles.box}
								onClick={() => handlePayment(price3, "3")}
							>
								<div>
									<p className={styles.box__title}>{t("Subscription")}</p>
									<p className={styles.box__subtitle}>{t("6 months")}</p>
								</div>
								<div>
									<p className={styles.box__title}>{t("discount 33%")}</p>
									<p className={styles.box__subtitle}>
										<span>{t("$49")}</span>
										{t("$33.90")}
									</p>
								</div>
							</div>
							<div
								className={styles.box}
								onClick={() => handlePayment(price, "1")}
							>
								<div>
									<p className={styles.box__title}>{t("Subscription")}</p>
									<p className={styles.box__subtitle}>{t("1 month")}</p>
								</div>
								<div>
									<p className={styles.box__subtitle}>{t("$6.90")}</p>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className={styles.payment__wrapper}>
						<p className={styles.subText}>{t("Choose a payment system")}</p>
						<div className={styles.payments}>
							<div className={styles.btn} onClick={handlePaymentRF}>
								{t("Payment by RF card")}
							</div>
							<div className={styles.btn} onClick={handlePaymentForeign}>
								{t("Payment by foreign card")}
							</div>
						</div>
						<p className={styles.reset} onClick={goToMain}>
							<Image src={Arrow} alt="Arrow" width={15} />
							{t("Come back")}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
