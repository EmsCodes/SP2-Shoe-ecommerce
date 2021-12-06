import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";

adminMenu();
logOut();

const token = getToken();

if (!token) {
	window.location.href = "/";
}
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = url + "/products/" + id;

const editForm = document.querySelector(".edit-form");
const editTitle = document.querySelector("#edit-title");
const editDescription = document.querySelector("#edit-description");
const editPrice = document.querySelector("#edit-price");
let editProductImg = document.querySelector("#edit-product-img");
let editFeaturedCheckbox = document.querySelector("#edit-featured-checkbox");

(async function () {
	try {
		const response = await fetch(productUrl);
		const data = await response.json();

		// console.log(url + data.image.formats.large.url);

		editTitle.value = data.title;
		editDescription.value = data.description;
		editPrice.value = data.price;
		editProductImg = url + data;
		editFeaturedCheckbox.checked = data.featured;

		// editProductImg.value = url + "/uploads/" + data.image.name;
	} catch (error) {
		console.log(error);
	}
	//  finally {
	//     loading.style.display = "none";
	//     form.style.display = "block";
	// }
})();
