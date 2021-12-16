import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";
import checkLength from "./components/functions.js";
import { displaySearchBar } from "./components/search.js";
import { submitAddForm } from "./components/functions.js";
import { createProducts } from "./components/functions.js";

const token = getToken();
const addForm = document.querySelector(".add-form");

if (!token) {
	window.location.href = "/";
}
adminMenu();
logOut();

// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);
searchBtn.addEventListener("onkeyup", displaySearchBar);

addForm.addEventListener("submit", submitAddForm);

// delete product

const editContainer = document.querySelector(".edit-list");
const messageContainer = document.querySelector(".message-container");

const productsUrl = url + "/products";

(async function fetchProducts() {
	try {
		const response = await fetch(productsUrl);

		const data = await response.json();

		createProducts(data, editContainer);
	} catch (error) {
		console.log(error);
	}
})();
