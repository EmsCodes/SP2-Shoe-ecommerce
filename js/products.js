import { displaySearchBar } from "./components/search.js";
import { url } from "./data/api.js";
import createProducts from "./ui/products.js";
import { productContainer } from "./data/variables.js";

// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);

const productsUrl = url + "/products";

(async function fetchProducts() {
	try {
		const response = await fetch(productsUrl);

		const data = await response.json();

		createProducts(data, productContainer);
	} catch (error) {
		console.log(error);
	}
})();
