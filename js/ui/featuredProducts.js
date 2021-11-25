import { url } from "../data/api.js";

export default function featuredProducts(products, carouselContainer) {
	const container = document.querySelector(carouselContainer);

	container.innerHTML = "";

	for (let i = 0; i < products.length; i++) {
		if (products[i].featured) {
			console.log(products[i]);

			const img = products[i].image.url;

			const featuredImg = url + img;

			container.innerHTML += `<div class="card-container">
      <a href="products.html">
          <div class="card">
            <img class="card-img-top" src="${featuredImg}" alt="${products[i].image.alternativeText}">
            <div class="card-body">
              <p class="product-brand">Brand</p>
              <h4 class="card-title">${products[i].title}</h4>
              <p class="price"><span class="sr-only">Price:</span>$${products[i].price}</p>
              </div>
          </div>
      </a>
      </div>`;
		}
	}
}
