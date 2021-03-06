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
const priceContainer = document.querySelector(".price-total");

function getCart(cartItems) {
	let totalPrice = 0;

	cartList.innerHTML = "";

	if (cartItems.length === 0) {
		cartList.innerHTML = "Cart empty!";
		cartList.style.textAlign = "center";
		cartList.style.padding = "100px";
		cartList.style.fontSize = "1.5em";
	}

	cartItems.forEach((item) => {
		const price = parseFloat(item.productPrice);

		const itemId = item.productId;

		totalPrice += price;

		priceContainer.innerHTML = totalPrice;

		cartList.innerHTML += `<li class="cart-item"> 
      <div>
			<a href="product-page.html?id=${itemId}"class="product-link">
        <img src="${item.productImage}" class="product-img" alt="product alt text">
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
				<button class="remove-btn" data-id="${itemId}"><i class="fas fa-times" data-id="${itemId}" aria-hidden="true"></i><span class="sr-only">Remove item from cart</span></button>
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
	location.reload();

	if (newCart.length === 0) {
		cartList.innerHTML = "<li>Cart Empty!</li>";
	}
}

getCart(cart);
