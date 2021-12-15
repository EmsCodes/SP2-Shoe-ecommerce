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

// delete product

const editContainer = document.querySelector(".edit-list");

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

function createProducts(data, container) {
	for (let i = 0; i < data.length; i++) {
		// console.log(data[i].id);

		container.innerHTML += `<li>
		<a href="product-page.html?id=${data[i].id}"><h3>${data[i].title}</h3></a>
			<img src="${data[i].img_url}" alt="Image description">
			<a href="edit.html?id=${data[i].id}">Edit</a>
			<button class="delete-btn" data-id="${data[i].id}"><span class="sr-only">Delete item</span><i class="fas fa-trash-alt" data-id="${data[i].id}"></i></button>
		</li>`;
	}
	const deleteBtn = document.querySelectorAll(".delete-btn");

	deleteBtn.forEach((btn) => {
		btn.addEventListener("click", deleteProduct);
	});
}

async function deleteProduct() {
	let id = this.dataset.id;

	console.log(id);
	const deleteConfirm = confirm("Delete this product?");

	if (deleteConfirm) {
		const deleteUrl = url + "/products/" + id;

		const options = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const deleteResponse = await fetch(deleteUrl, options);
			const result = await deleteResponse.json();

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}
}
