import { url } from "../data/api.js";
import { addToCart } from "../components/functions.js";

export function fetchProductDetails(data, container) {
	const detailsContainer = document.querySelector(container);

	const breadCrumbProductTitle = document.querySelector(".product-title");

	const productImg = url + data.image.url;

	const title = data.title;
	const id = data.id;
	const price = data.price;

	breadCrumbProductTitle.innerHTML = `${data.title}`;

	detailsContainer.innerHTML = `
  <div class="detail-wrapper">
    <div id="carouselExampleIndicators" class="carousel slide" data-interval="false">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
        </div>
        <div class="carousel-item">
          <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
        </div>
        <div class="carousel-item">
          <img src="${productImg}" class="d-block" alt="${data.image.alternativeText}" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"data-bs-slide="prev">
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="text-bg">
      <div class="details-text">
        <p class="detail-brand-name">Brand</p>
        <h1>${title}</h1>
        <p class="product-description">${data.description}</p>
        <div class="price-flex-container">
          <p class="price"><span class="sr-only">Price:</span>$${price}</p>
          <button class="buy-btn" data-id="${id}" data-title="${title}" data-price="${price}">Buy<i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </div>
  </div>`;

	const buyBtn = document.querySelector(".buy-btn");

	buyBtn.addEventListener("click", addToCart);
}
