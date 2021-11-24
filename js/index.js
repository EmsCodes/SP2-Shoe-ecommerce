import { url } from "./data/api.js";
import heroBanner from "./ui/indexHeroBanner.js";
import featuredProducts from "./ui/featuredProducts.js";

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

		// featuredProducts(products, container);
	} catch (error) {
		console.log(error);
	}
}

fetchProducts();

// FEATURED PRODUCTS CAROUSEL
///////////////////////////////////////////////////////////////

const carousel = document.querySelector(".carousel");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

let carouselWidth = document.querySelector(".featured-products").offsetWidth;

// window.addEventListener("resize", () => {
// 	carouselWidth = document.querySelector(".featured-products").offsetWidth;
// });

console.log(carouselWidth);

let index = 0;

next.addEventListener("click", () => {
	index++;
	previous.classList.add("show");
	carousel.style.transform = `translateX(${-index * carouselWidth}px)`;
	console.log(index);

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
