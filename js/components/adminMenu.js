import { getUsername } from "./storage.js";

const userName = getUsername();

const logOutBtn = document.querySelector(".log-out-btn");

export function adminMenu() {
	if (userName) {
		logOutBtn.style.display = "block";
	}
}

export function logOut() {
	logOutBtn.onclick = function () {
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		location.href = "index.html";
		if (!userName) {
			logOutBtn.style.display = "none";
		}
	};
}
