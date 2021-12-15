import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";
import checkLength from "./components/functions.js";
import { displaySearchBar } from "./components/search.js";
import { submitAddForm } from "./components/functions.js";

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

const editContainer = document.querySelector(".edit-list");

const productsUrl = url + "/products";

(async function fetchProducts() {
	try {
		const response = await fetch(productsUrl);

		const data = await response.json();

		console.log(data);

		createProducts(data, editContainer);
	} catch (error) {
		console.log(error);
	}
})();

function createProducts(data, container) {
	for (let i = 0; i < data.length; i++) {
		console.log(data[i].image_url);

		container.innerHTML += `<li>
		<a href="product-page.html?id=${data[i].id}"><h3>${data[i].title}</h3></a>
			<img src="${data[i].img_url}" alt="Image description">
			<a href="edit.html?id=${data[i].id}">Edit</a>
			<button><span class="sr-only">Delete item</span><i class="fas fa-trash-alt"></i></button>
		</li>`;
	}
}
