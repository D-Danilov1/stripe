const user_name = document.querySelector(".user_name");
const user_email = document.querySelector(".user_email");
const user_number = document.querySelector(".user_number");

function isValidForm() {
	const name = user_name.value;
	const email = user_email.value;
	const number = user_number.value;

	const isValName = isValidName(name);
	const isValEmail = isValidEmail(email);
	const isValNumber = isValidNumber(number);

	if (isValEmail && isValNumber && isValName) return true;
	return false;
}

function isValidName(name) {
	const usernameRegex = /^[a-zA-Za-яА-Я]{3,}$/;
	const isValid = usernameRegex.test(name);
	if (!isValid) {
		user_name.classList.add("invalid");
		return isValid;
	} else {
		user_name.classList.remove("invalid");
		return isValid;
	}
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValid = emailRegex.test(email);
	if (!isValid) {
		user_email.classList.add("invalid");
		return isValid;
	} else {
		user_email.classList.remove("invalid");
		return isValid;
	}
}

function isValidNumber(phoneNumber) {
	const phoneRegex = /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
	const isValid = phoneRegex.test(phoneNumber);
	if (!isValid) {
		user_number.classList.add("invalid");
		return isValid;
	} else {
		user_number.classList.remove("invalid");
		return isValid;
	}
}

export { isValidForm };
