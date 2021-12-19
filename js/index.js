import { url } from "./data/api.js";
import heroBanner from "./ui/indexHeroBanner.js";
import featuredProducts from "./ui/featuredProducts.js";
import { displaySearchBar } from "./components/search.js";
import { cartCounter } from "./components/functions.js";
import { displayMessage } from "./components/displayMessage.js";

import { adminMenu, logOut } from "./components/adminMenu.js";

adminMenu();
logOut();

cartCounter();

// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);
searchBtn.addEventListener("onkeyup", displaySearchBar);

const heroContainer = ".hero-background";
const carouselContainer = ".carousel";

async function fetchProducts() {
	try {
		const productResponse = await fetch(url + "/products");
		const heroBannerResponse = await fetch(url + "/home");

		const products = await productResponse.json();
		const heroImage = await heroBannerResponse.json();

		heroBanner(heroImage, heroContainer);
		featuredProducts(products, carouselContainer);
	} catch (error) {
		const container = document.querySelector(carouselContainer);
		container.style.width = "100%";
		displayMessage(
			"error",
			"An error ocurred while fetching the products!",
			carouselContainer
		);
	}
}

fetchProducts();

// FEATURED PRODUCTS CAROUSEL
///////////////////////////////////////////////////////////////

const carousel = document.querySelector(".carousel");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const featuredContainer = document.querySelector(".featured-products");

let carouselWidth = featuredContainer.offsetWidth;

let index = 0;

next.addEventListener("click", () => {
	index++;
	previous.classList.add("show");
	carousel.style.transform = `translateX(${-index * carouselWidth}px)`;

	if (carousel.offsetWidth - index * carouselWidth < carouselWidth) {
		next.classList.add("hide");
	}
});

previous.addEventListener("click", () => {
	index--;
	next.classList.remove("hide");
	if (index === 0) {
		previous.classList.remove("show");
	}
	carousel.style.transform = `translateX(${-index * carouselWidth}px)`;
});

window.addEventListener("resize", () => {
	carouselWidth = featuredContainer.offsetWidth;
});
