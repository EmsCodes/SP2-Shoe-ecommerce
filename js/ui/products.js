import { getUsername } from "../components/storage.js";

const userName = getUsername();

export default function createProducts(products, container) {
	const elementContainer = document.querySelector(container);

	for (let i = 0; i < products.length; i++) {
		const img = products[i].image_url;

		let productLink = "product-page.html?id";
		let productIcon = `<i class="fas fa-shopping-bag"></i>`;

		elementContainer.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gy-4">
      <a href="${productLink}=${products[i].id}">
      <div class="card">
        <img
          src="${img}"
          class="card-img-top"
          alt=""
        />
        <div class="card-body">
          <p class="brand-name">Brand</p>
          <h2 class="card-title">${products[i].title}</h2>
          <div class="price-flex-container">
            <div><p class="price"><span class="sr-only">Price:</span>$${products[i].price}</></div>
            <div class="bag-icon">${productIcon}</div>
          </div>
        </div>
      </div>
      </a>
    </div> `;
	}
}
