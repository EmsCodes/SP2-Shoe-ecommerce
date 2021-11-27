import { url } from "../data/api.js";

export default function createProducts(products, container) {
	const elementContainer = document.querySelector(container);

	for (let i = 0; i < products.length; i++) {
		const img = products[i].image.url;

		const productImg = url + img;

		console.log(productImg);

		elementContainer.innerHTML += `
    <div class="col-6 col-sm-4 col-lg-3">
      <a href="product-page.html?id=${products[i].id}">
      <div class="card">
        <img
          src="${productImg}"
          class="card-img-top"
          alt="${products[i].image.alternativeText}"
        />
        <div class="card-body">
          <h2 class="card-title">${products[i].title}</h2>
        </div>
      </div>
      </a>
    </div> `;
	}
}
