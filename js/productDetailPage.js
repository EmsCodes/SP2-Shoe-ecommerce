import { url } from "./data/api.js";
import { fetchProductDetails } from "./ui/fetchProduct.js";
import { detailsContainer } from "./data/variables.js";

// const productContainer = document.querySelector(".product-detail-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = url + "/products/" + id;

(async function fetchProducts() {
	try {
		const response = await fetch(productUrl);

		const data = await response.json();

		fetchProductDetails(data, detailsContainer);

		// console.log(data);
	} catch (error) {
		console.log(error);
	}
})();
