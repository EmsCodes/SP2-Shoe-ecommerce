import { url } from "./data/api.js";
import { saveToken, saveUser } from "./components/storage.js";
import checkLength from "./components/formCheck.js";
import { displayMessage } from "./components/displayMessage.js";
import { getToken } from "./components/storage.js";
import { adminMenu } from "./components/adminMenu.js";

adminMenu();

// const messageContainer = document.querySelector(".message-container");
const loginForm = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();

	// console.log("Yo!");
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	if (
		checkLength(usernameValue, 0)
			? (usernameError.style.display = "none")
			: (usernameError.style.display = "block")
	)
		if (
			checkLength(passwordValue, 0)
				? (passwordError.style.display = "none")
				: (passwordError.style.display = "block")
		)
			userLogIn(usernameValue, passwordValue);
}

async function userLogIn(name, password) {
	const loginUrl = url + "/auth/local";

	console.log(loginUrl);

	const data = JSON.stringify({ identifier: name, password: password });

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(loginUrl, options);

		const result = await response.json();

		console.log(result);

		if (result.user) {
			saveToken(result.jwt);
			saveUser(result.user);

			loginForm.reset();
			location.href = "admin.html";
		}

		if (result.error) {
			console.log(result.error);

			displayMessage("warning", "Invalid login details", ".message-container");
		}
	} catch (error) {
		console.log(error);
	}
}
