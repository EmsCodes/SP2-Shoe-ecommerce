import { url } from "../data/api.js";

export default function featuredProducts(products, carouselContainer) {
	const container = document.querySelector(carouselContainer);

	container.innerHTML = "";

	for (let i = 0; i < products.length; i++) {
		if (products[i].featured === true) {
			const img = products[i].image_url;

			console.log(img);

			container.innerHTML += `<div class="card-container">
      <a href="products.html">
          <div class="card">
            <img class="card-img-top" src="${img}" alt="Image description" >
            <div class="card-body">
              <p class="product-brand">Brand</p>
              <h3 class="card-title">${products[i].title}</h3>
              <div class="price-flex-container">
                <p class="price"><span class="sr-only">Price:</span>$${products[i].price}</p>
                <div class="bag-icon"><i class="fas fa-shopping-bag"></i></div>
              </div>
              </div>
          </div>
      </a>
      </div>`;
		}
	}
}
