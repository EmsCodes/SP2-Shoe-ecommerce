import { url } from "../data/api.js";

export default function featuredProducts(products, carouselContainer) {
	const container = document.querySelector(carouselContainer);

	container.innerHTML = "";

	for (let i = 0; i < products.length; i++) {
		if (products[i].featured === true) {
			const img = products[i].image_url;
			const title = products[i].title;
			const price = products[i].price;

			if (!img) {
				img =
					"https://via.placeholder.com/200/ffddbe/734021?text=Image+missing";
			}
			if (!title) {
				title = "Title missing!";
			}
			if (!price) {
				price = "Price missing!";
			}

			container.innerHTML += `<div class="card-container">
      <a href="product-page.html?id=${products[i].id}">
          <div class="card">
            <img class="card-img-top" src="${img}" alt="Image description" >
            <div class="card-body">
              <p class="product-brand">Brand</p>
              <h3 class="card-title">${title}</h3>
              <div class="price-flex-container">
                <p class="price"><span class="sr-only">Price:</span>$${price}</p>
                <div class="bag-icon"><i class="fas fa-shopping-bag"></i></div>
              </div>
              </div>
          </div>
      </a>
      </div>`;
		}
	}
}
