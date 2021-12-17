import {
	getFromStorage,
	saveToStorage,
	getToken,
} from "./components/storage.js";
import { adminMenu, logOut } from "./components/adminMenu.js";
import { displaySearchBar } from "./components/search.js";
import { cartCounter } from "./components/functions.js";

cartCounter();

adminMenu();
logOut();

displaySearchBar();
// display searchbar function for mobile and tablet
const searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", displaySearchBar);
searchBtn.addEventListener("onkeyup", displaySearchBar);

const token = getToken();

if (!token) {
	window.location.href = "/";
}

const cart = getFromStorage("cart");
const cartList = document.querySelector(".shopping-list");

function getCart(cartItems) {
	let totalPrice = 0;

	cartList.innerHTML = "";

	cartItems.forEach((item) => {
		if (item.length) {
			cartList.innerHTML = "Cart Empty!";
		}
		const price = parseInt(item.productPrice);

		const priceContainer = document.querySelector(".price-total");
		const itemNumber = document.querySelector(".items-in-cart");

		itemNumber.innerHTML = item;

		const itemId = item.productId;

		totalPrice += price;

		priceContainer.innerHTML = totalPrice;

		cartList.innerHTML += `<li class="cart-item"> 
      <div>
			<a href="product-page.html?id=${itemId}"class="product-link">
        <img src="${item.productImage}" class="product-img alt="product alt text">
      </a>
        <p class="product-brand">Brand</p>
        <a href="product-page.html?id=${itemId}"class="product-link">
          <h2>${item.productTitle}</h2>
        </a>
      </div>
      <div class="cart-info">
				<p>Size: 10</p>
        <p>Colour: Colour</p>
        <p class="price">$${item.productPrice}</p>
				<button class="remove-btn" data-id="${itemId}"><i class="fas fa-times" data-id="${itemId}"></i></button>
      </div>
    </li>`;

		const removeBtn = document.querySelectorAll(".remove-btn");

		removeBtn.forEach((btn) => {
			btn.addEventListener("click", removeItem);
		});
	});

	// console.log(totalPrice);
}

function removeItem() {
	const id = this.dataset.id;

	const currentCart = getFromStorage("cart");

	let newCart = currentCart.filter(function (product) {
		if (product.productId !== id) {
			return true;
		}
	});

	getCart(newCart);
	saveToStorage("cart", newCart);
	cartCounter();

	if (newCart.length === 0) {
		cartList.innerHTML = "Cart Empty!";
	}
}

getCart(cart);
