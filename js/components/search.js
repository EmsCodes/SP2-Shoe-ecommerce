// Function to display search form onclick
import { url } from "../data/api.js";

const searchField = document.querySelector(`input[type="search"]`);

const searchBar = document.querySelector(".search-bar");
const searchContainer = document.querySelector(".search-results");

export function displaySearchBar() {
	if (searchBar.style.display === "none") {
		searchBar.style.display = "block";
		document.querySelector("#search").focus();
	} else {
		searchBar.style.display = "none";
	}
	document.addEventListener("click", function (event) {
		if (event.target.closest("main") || event.target.matches(".fa-times")) {
			searchBar.style.display = "none";
		}
	});
}

// filter/search for shoes
function searchProducts(products) {
	searchField.onkeyup = function () {
		searchContainer.innerHTML = "";
		const searchValue = this.value.trim().toLowerCase();

		const filteredProduct = products.filter(
			(product) =>
				product.title.toLowerCase().includes(searchValue) ||
				product.description.toLowerCase().includes(searchValue)
		);

		for (let i = 0; i < filteredProduct.length; i++) {
			searchContainer.innerHTML += `<li><a href="product-page.html?id=${filteredProduct[i].id}">${filteredProduct[i].title} ></a></li>`;
		}

		if (!searchValue.length || !filteredProduct) {
			searchContainer.innerHTML = "No results!";
		}
	};
}

async function fetchItems() {
	try {
		const productResponse = await fetch(url + "/products");

		const products = await productResponse.json();

		searchProducts(products);
	} catch (error) {
		console.log(error);
	}
}

fetchItems();
