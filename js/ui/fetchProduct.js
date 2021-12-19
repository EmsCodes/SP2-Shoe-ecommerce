import { url } from "../data/api.js";
import { getFromStorage, saveToStorage } from "../components/storage.js";
import { cartCounter } from "../components/functions.js";

cartCounter();

export function fetchProductDetails(product, container) {
	const detailsContainer = document.querySelector(container);

	console.log(product.image_url);

	const breadCrumbProductTitle = document.querySelector(".product-title");

	const img = product.image_url;

	const title = product.title;
	const id = product.id;
	const price = product.price;

	breadCrumbProductTitle.innerHTML = `${title}`;

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
          <img src="${img}" class="d-block" alt="" />
        </div>
        <div class="carousel-item">
          <img src="${img}" class="d-block" alt="" />
        </div>
        <div class="carousel-item">
          <img src="${img}" class="d-block" alt="" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"data-bs-slide="prev" aria-label="previous carousel image navigation">
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" aria-label="next carousel image navigation">
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden"></span>
      </button>
    </div>
    <div class="text-bg">
      <div class="details-text">
        <p class="detail-brand-name">Brand</p>
        <h1>${title}</h1>
        <p class="product-description">${product.description}</p>
        <div class="price-flex-container">
          <p class="price"><span class="sr-only">Price:</span>$${price}</p>
          <button class="buy-btn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${img}">Add to cart<i class="fas fa-cart-plus" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>`;

	const buyBtn = document.querySelector(".buy-btn");

	buyBtn.addEventListener("click", addToCart);

	closingX.onclick = function () {
		addMessage.style.display = "none";
	};
}

// add to cart
function addToCart() {
	const currentCart = getFromStorage("cart");
	const addMessage = document.querySelector(".add-message");
	const closingX = document.querySelector(".fa-times");

	const productId = this.dataset.id;
	const productTitle = this.dataset.title;
	const productPrice = this.dataset.price;
	const productImage = this.dataset.image;

	const newProduct = {
		productId,
		productTitle,
		productPrice,
		productImage,
	};
	currentCart.push(newProduct);

	saveToStorage("cart", currentCart);
	cartCounter();
	addMessage.style.display = "block";
	addMessage.innerHTML = `
    <p>Product added to cart!<i class="fas fa-check-circle"></i></p>
    <div class="message-navigation">
      <a href="products.html"> < Continue shopping</a>
      <a href="cart.html">Go to cart ></a>
    </div>`;
}
