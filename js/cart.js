import { getFromStorage, saveToStorage } from "./components/storage.js";

const cart = getFromStorage("cart");
const cartList = document.querySelector(".shopping-list");

function getCart(cartItems) {
	let totalPrice = 0;

	cartList.innerHTML = "";

	if (cart.length === 0) {
		cartList.innerHTML = "Cart Empty!";
	}

	cartItems.forEach((item) => {
		const price = parseInt(item.productPrice);

		const itemId = item.productId;

		totalPrice += price;

		cartList.innerHTML += `<li class="cart-item"> 
      <div>
			<a href="product-page.html?id=${itemId}"class="product-link">
        <img src="${item.productImage}" class="product-img">
      </a>
        <p class="productBrand">Brand</p>
        <a href="product-page.html?id=${itemId}"class="product-link">
          <h2>${item.productTitle}</h2>
        </a>
      </div>
      <div class="cart-info">
				<p>Size: 10</p>
        <p>Colour: Brown</p>
        <p class="price">${item.productPrice}</p>
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

	if (newCart.length === 0) {
		cartList.innerHTML = "Cart Empty!";
	}
}

getCart(cart);
