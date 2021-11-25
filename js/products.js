import { displaySearchBar } from "./components/search.js";

// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);

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
