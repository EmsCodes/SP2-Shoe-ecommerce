import { url } from "../data/api.js";
import { getUsername } from "../components/storage.js";

const userName = getUsername();

export default function createProducts(products, container) {
	const elementContainer = document.querySelector(container);

	for (let i = 0; i < products.length; i++) {
		console.log(products[i].image_url);

		const img = products[i].image_url;

		let productLink = "product-page.html?id";
		let productIcon = `<i class="fas fa-shopping-bag"></i>`;

		if (userName) {
			productLink = "edit.html?id";
			productIcon = `<p class="edit-product">Edit product</p>`;
		}

		// const productImg = url + img;

		elementContainer.innerHTML += `
    <div class="col-6 col-sm-4 col-lg-3">
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
