import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";
import checkLength from "./components/formCheck.js";

const token = getToken();

if (!token) {
	window.location.href = "/";
}
adminMenu();
logOut();

const titleError = document.querySelector("#title-error");
const descriptionError = document.querySelector("#description-error");
const priceError = document.querySelector("#price-error");
const imgError = document.querySelector("#product-img-error");

const addForm = document.querySelector(".add-form");
const message = document.querySelector(".message-container");
const addTitle = document.querySelector("#title");
const addDescription = document.querySelector("#description");
const addPrice = document.querySelector("#price");
const addProductImg = document.querySelector("#product-img");
const addFeaturedCheckbox = document.querySelector("#featured-checkbox");

addForm.addEventListener("submit", submitAddForm);

function submitAddForm(event) {
	event.preventDefault();

	const titleValue = addTitle.value.trim();
	const descriptionValue = addDescription.value.trim();
	const priceValue = parseFloat(addPrice.value);
	const imgValue = addProductImg.value;

	const featuredProduct = addFeaturedCheckbox.checked;

	// if (
	// 	titleValue.length === 0 ||
	// 	descriptionValue.length === 0 ||
	// 	isNaN(priceValue) ||
	// 	!imgValue.length
	// ) {
	// 	displayMessage("warning", "Invalid input", ".message-container");
	// }
	if (
		checkLength(titleValue, 0)
			? (titleError.style.display = "none")
			: (titleError.style.display = "block")
	);
	if (
		checkLength(descriptionValue, 0)
			? (descriptionError.style.display = "none")
			: (descriptionError.style.display = "block")
	);
	if (isNaN(priceValue)) {
		priceError.style.display = "block";
	} else {
		priceError.style.display = "none";
	}
	if (
		checkLength(imgValue, 0)
			? (imgError.style.display = "none")
			: (imgError.style.display = "block")
	);
	addProduct(
		titleValue,
		descriptionValue,
		priceValue,
		featuredProduct,
		imgValue
	);
}

async function addProduct(title, description, price, featured, image_url) {
	const editUrl = url + "/products";

	const data = JSON.stringify({
		title,
		description,
		price,
		featured,
		image_url,
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
			addForm.reset();
		}
		console.log(result);
	} catch (error) {
		// console.log(error);
	}
}
