import { displaySearchBar } from "./components/search.js";
import { url } from "./data/api.js";
import createProducts from "./ui/products.js";
import { productContainer } from "./data/variables.js";
import { adminMenu, logOut } from "./components/adminMenu.js";
import { cartCounter } from "./components/functions.js";
import { displayMessage } from "./components/displayMessage.js";

cartCounter();

adminMenu();
logOut();

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
		displayMessage(
			"error",
			"An error ocurred while fetching the products!",
			productContainer
		);
		console.log(error);
	}
})();
