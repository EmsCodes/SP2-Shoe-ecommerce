import { saveToStorage, getFromStorage } from "../components/storage.js";
import { getToken } from "../components/storage.js";
import { url } from "../data/api.js";
import { displayMessage } from "./displayMessage.js";

const token = getToken();

const currentCart = getFromStorage("cart");

// add product function

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

export function submitAddForm(event) {
	event.preventDefault();

	message.innerHTML = "";

	const titleValue = addTitle.value.trim();
	const descriptionValue = addDescription.value.trim();
	const priceValue = parseFloat(addPrice.value);
	const imgValue = addProductImg.value;

	const featuredProduct = addFeaturedCheckbox.checked;

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
	if (
		titleValue.length === 0 ||
		descriptionValue.length === 0 ||
		isNaN(priceValue) ||
		!imgValue.length
	) {
		displayMessage("warning", "Invalid input", ".message-container");
	} else {
		addProduct(
			titleValue,
			descriptionValue,
			priceValue,
			featuredProduct,
			imgValue
		);
		addForm.reset();
		createProducts(data, container);
	}
}

async function addProduct(title, description, price, featured, image_url) {
	const editUrl = url + "/products";
	const token = getToken();

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
			displayMessage("success", "Product created!", ".message-container");
		}
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}

// delete function

export function createProducts(data, container) {
	container.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
		console.log(data[i].image_url);

		container.innerHTML += `<li>
			<img class="admin-product-img"src="${data[i].image_url}" alt="Image description">
			<div class="edit-options">
				<a href="product-page.html?id=${data[i].id}"><h3>${data[i].title}</h3></a>
				<a class="edit-link" href="edit.html?id=${data[i].id}">Edit</a>
				<button class="delete-btn" data-id="${data[i].id}"><span class="sr-only">Delete item</span><i class="fas fa-trash-alt" data-id="${data[i].id}"></i></button>
			</div>
			</li>`;
	}
	const deleteBtn = document.querySelectorAll(".delete-btn");

	deleteBtn.forEach((btn) => {
		btn.addEventListener("click", deleteProduct);
	});
}
async function deleteProduct() {
	const id = this.dataset.id;

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

			if (result.updated_at) {
				displayMessage("success", "Product deleted!", ".message-container");
				location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export function cartCounter() {
	const cartCount = document.querySelector(".cart-counter");

	const cartAmount = getFromStorage("cart");

	cartCount.innerHTML = cartAmount.length;
}

// form check

export default function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}
