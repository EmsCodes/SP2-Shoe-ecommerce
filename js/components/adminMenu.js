import { getUsername, getToken } from "./storage.js";
import { cartCounter } from "./functions.js";

const userName = getUsername();
const token = getToken();

const logOutBtn = document.querySelector(".log-out-btn");
const adminMenuLink = document.querySelector(".admin-nav-link");

export function adminMenu() {
	if (!userName || !token) {
		logOutBtn.style.display = "none";
		adminMenuLink.style.display = "none";
	} else {
		logOutBtn.style.display = "block";
		adminMenuLink.style.display = "block";
	}
}

export function logOut() {
	logOutBtn.onclick = function () {
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		location.href = "index.html";
		logOutBtn.style.display = "none";
	};
}
