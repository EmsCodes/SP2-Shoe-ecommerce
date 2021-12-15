import { saveToStorage, getFromStorage } from "../components/storage.js";
import { getToken } from "../components/storage.js";
import { url } from "../data/api.js";
import { displayMessage } from "./displayMessage.js";

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
		// console.log(error);
	}
}

// add to cart
export function addToCart() {
	const productId = this.dataset.id;
	const productTitle = this.dataset.title;
	const productPrice = this.dataset.price;
	const productImage = this.dataset.image;

	const newProduct = {
		productId,
		productTitle,
		productPrice,
		productImage,
	};

	currentCart.push(newProduct);

	saveToStorage("cart", currentCart);
}

export function cartCounter() {
	const cartCount = document.querySelector(".cart-counter");

	for (let i = 0; i < currentCart.length; i++) {
		console.log(i);

		cartCount.innerHTML = currentCart.length;
	}
}

// form check

export default function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}
