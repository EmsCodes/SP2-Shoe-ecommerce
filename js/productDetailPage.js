import { url } from "./data/api.js";
import { fetchProductDetails } from "./ui/fetchProduct.js";
import { detailsContainer } from "./data/variables.js";
import { adminMenu, logOut } from "./components/adminMenu.js";
import { displaySearchBar } from "./components/search.js";
import { cartCounter } from "./components/functions.js";

cartCounter();

// cartCounter();
adminMenu();
logOut();

const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);
searchBtn.addEventListener("onkeyup", displaySearchBar);

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
