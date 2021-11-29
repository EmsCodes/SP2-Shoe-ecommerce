import { getFromStorage } from "./components/storage.js";

(function getCart() {
	const cartList = document.querySelector(".shopping-list");

	const cart = getFromStorage("cart");

	// console.log(cart);

	let totalPrice = 0;

	cart.forEach((item) => {
		const price = parseInt(item.productPrice);

		totalPrice += price;

		cartList.innerHTML += `<li class="cart-item"> 
      <img src="${item.productImage}" class="product-img">
      <div>
      <p class="productBrand">Brand</p>
      <h3>${item.productTitle}</h3>
      <p>Size: 10</p>
      <p>Colour: Brown</p>
      </div>
    </li>`;
	});

	console.log(totalPrice);
})();
