import { saveToStorage, getFromStorage } from "../components/storage.js";

const currentCart = getFromStorage("cart");

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
