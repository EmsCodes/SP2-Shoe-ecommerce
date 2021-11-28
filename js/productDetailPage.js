import { url } from "./data/api.js";
import { fetchProductDetails } from "./ui/fetchProduct.js";
import { detailsContainer } from "./data/variables.js";

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

		fetchProductDetails(data, detailsContainer);
		// console.log(data);
	} catch (error) {
		console.log(error);
	}
})();

// function fetchProductDetails(data) {
// 	console.log(data.title);

// 	const productImg = url + data.image.url;

// 	breadCrumbTitle.innerHTML = `${data.title}`;

// 	detailsContainer.innerHTML = `
//   <div class="detail-wrapper">
//     <div
//       id="carouselExampleIndicators"
//       class="carousel slide"
//       data-interval="false"
//     >
//       <div class="carousel-indicators">
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="0"
//           class="active"
//           aria-current="true"
//           aria-label="Slide 1"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="1"
//           aria-label="Slide 2"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="2"
//           aria-label="Slide 3"
//         ></button>
//       </div>
//       <div class="carousel-inner">
//         <div class="carousel-item active">
//           <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
//         </div>
//         <div class="carousel-item">
//           <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
//         </div>
//         <div class="carousel-item">
//           <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
//         </div>
//       </div>
//       <button
//         class="carousel-control-prev"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="prev"
//       >
//         <span
//           class="carousel-control-prev-icon"
//           aria-hidden="true"
//         ></span>
//         <span class="visually-hidden">Previous</span>
//       </button>
//       <button
//         class="carousel-control-next"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="next"
//       >
//         <span
//           class="carousel-control-next-icon"
//           aria-hidden="true"
//         ></span>
//         <span class="visually-hidden">Next</span>
//       </button>
//     </div>
//     <div class="detail-text">
//       <p class="detail-brand">Brand</p>
//       <h1>${data.title}</h1>
//       <p class="product-description">${data.description}</p>
//       <div class="price-flex-container">
//         <p class="price"><span class="sr-only">Price:</span>$${data.price}</p>
//         <a class="buy-btn">Buy</a>
//       </div>
//     </div>
//   </div>`;
// }
