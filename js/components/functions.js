import { saveToStorage, getFromStorage } from "../components/storage.js";

export function addToCart() {
	const productId = this.dataset.id;
	const productTitle = this.dataset.title;
	const productPrice = this.dataset.price;

	const currentCart = getFromStorage("cart");

	const newProduct = {
		id: productId,
		title: productTitle,
		price: productPrice,
	};

	currentCart.push(newProduct);

	saveToStorage("cart", currentCart);
}
