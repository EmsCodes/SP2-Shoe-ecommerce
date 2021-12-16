import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken, getUsername } from "./components/storage.js";
import { url } from "./data/api.js";
import { displaySearchBar } from "./components/search.js";
import { messageDiv } from "./data/variables.js";
import { displayMessage } from "./components/displayMessage.js";

adminMenu();
logOut();

const token = getToken();
const user = getUsername();

if (!user) {
	window.location.href = "/";
}

// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);
searchBtn.addEventListener("onkeyup", displaySearchBar);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = url + "/products/" + id;

// const titleError = document.querySelector("#edit-title-error");
// const descriptionError = document.querySelector("#edit-description-error");
// const priceError = document.querySelector("#price-error");
// const imgError = document.querySelector("#edit-img-error");

const editForm = document.querySelector(".edit-form");
const editTitle = document.querySelector("#edit-title");
const editDescription = document.querySelector("#edit-description");
const editPrice = document.querySelector("#edit-price");
const editProductImg = document.querySelector("#edit-product-img");
const editFeaturedCheckbox = document.querySelector("#edit-featured-checkbox");
const messageContainer = document.querySelector(messageDiv);

(async function () {
	try {
		const response = await fetch(productUrl);
		const data = await response.json();

		editTitle.value = data.title;
		editDescription.value = data.description;
		editPrice.value = data.price;
		editProductImg.value = data.image_url;
		editFeaturedCheckbox.checked = data.featured;
	} catch (error) {
		displayMessage("error", "Error", messageDiv);
	}
	//  finally {
	//     loading.style.display = "none";
	//     form.style.display = "block";
	// }
})();

editForm.addEventListener("submit", formSubmit);

function formSubmit(event) {
	event.preventDefault();

	messageContainer.innerHTML = "";

	const titleValue = editTitle.value.trim();
	const descriptionValue = editDescription.value.trim();
	const priceValue = parseFloat(editPrice.value);
	const imgValue = editProductImg.value.trim();
	const featuredValue = editFeaturedCheckbox.checked;

	if (
		titleValue.length === 0 ||
		descriptionValue.length === 0 ||
		isNaN(priceValue) ||
		imgValue.length === 0
	) {
		return displayMessage(
			"warning",
			"Please supply correct values",
			messageDiv
		);
	}
	updateProduct(
		titleValue,
		descriptionValue,
		priceValue,
		imgValue,
		featuredValue,
		id
	);
}

async function updateProduct(
	title,
	description,
	price,
	productImg,
	featured,
	id
) {
	const editUrl = url + "/products/" + id;

	console.log(editUrl);

	const editData = JSON.stringify({
		title,
		description,
		price,
		image_url: productImg,
		featured,
	});

	const options = {
		method: "PUT",
		body: editData,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const editFetch = await fetch(editUrl, options);
		const result = await editFetch.json();

		if (result.updated_at) {
			displayMessage("success", "Product updated", messageDiv);
			editForm.reset();
		}
		if (result.error) {
			displayMessage("error", result.message, messageDiv);
		}
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}
