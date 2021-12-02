import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";

adminMenu();
logOut();

const token = getToken();

if (!token) {
	window.location.href = "index.html";
}
const addForm = document.querySelector(".add-form");
const message = document.querySelector(".message-container");
const productTitle = document.querySelector("#title");
const productDescription = document.querySelector("#description");
const productPrice = document.querySelector("#price");
const productImg = document.querySelector("#product-img");
const featuredCheckbox = document.querySelector("#featured-checkbox");

console.log(productImg);

addForm.addEventListener("submit", submitAddForm);

function submitAddForm(event) {
	event.preventDefault();

	const titleValue = productTitle.value.trim();
	const descriptionValue = productDescription.value.trim();
	const priceValue = parseFloat(productPrice.value);
	const imgValue = productImg.value;
	const featuredProduct = featuredCheckbox.checked;

	console.log(imgValue);

	if (
		titleValue.length === 0 ||
		descriptionValue.length === 0 ||
		isNaN(priceValue) ||
		imgValue.length === 0
	) {
		return displayMessage(
			"warning",
			"Please fill in all required fields",
			".message-container"
		);
	}
	addProduct(
		titleValue,
		descriptionValue,
		priceValue,
		imgValue,
		featuredProduct
	);
}

async function addProduct(title, description, price, image, featured) {
	const editUrl = url + "/products";

	const data = JSON.stringify({
		title,
		description,
		price,
		image,
		featured,
	});

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await fetch(editUrl, options);
		const result = await response.json();

		if (result.error) {
			console.log(result.error);
		}

		featured = result.featured;

		if (result.created_at) {
			displayMessage("success", "Product created!", message);
		}
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}
