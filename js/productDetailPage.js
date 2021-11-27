import { url } from "./data/api.js";

// const productContainer = document.querySelector(".product-detail-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const productUrl = url + "/products/" + id;

console.log(productUrl);

(async function fetchProducts() {
	try {
		const response = await fetch(productUrl);

		const data = await response.json();

		console.log(data);
	} catch (error) {
		console.log(error);
	}
})();
