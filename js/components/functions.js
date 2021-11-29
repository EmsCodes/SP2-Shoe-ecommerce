// import { url } from "../data/api.js";

import { saveToStorage, getFromStorage } from "../components/storage.js";

export function addToCart() {
	const productId = this.dataset.id;
	const productTitle = this.dataset.title;
	const productPrice = this.dataset.price;
	const productImage = this.dataset.image;

	const currentCart = getFromStorage("cart");

	const newProduct = {
		productId,
		productTitle,
		productPrice,
		productImage,
	};

	currentCart.push(newProduct);

	saveToStorage("cart", currentCart);
}
