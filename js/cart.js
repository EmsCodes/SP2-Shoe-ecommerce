import { getFromStorage, saveToStorage } from "./components/storage.js";

let cart = getFromStorage("cart");
const cartList = document.querySelector(".shopping-list");

function getCart(cartItems) {
	let totalPrice = 0;

	cartList.innerHTML = "";

	cartItems.forEach((item) => {
		const price = parseInt(item.productPrice);

		const itemId = item.productId;

		totalPrice += price;

		cartList.innerHTML += `<li class="cart-item"> 
      <img src="${item.productImage}" class="product-img">
      <div>
        <p class="productBrand">Brand</p>
        <h3>${item.productTitle}</h3>
        <p>Size: 10</p>
        <p>Colour: Brown</p>
      </div>
      <div class="cart-info">
        <p class="quantity">${item}</p>
        <p class="price">${item.productPrice}</p>
        <p class="total-price">${item.productPrice}</p>
      </div>
      <button class="remove-btn" data-id="${itemId}"><i class="fas fa-times" data-id="${itemId}"></i></button>
    </li>`;

		if ((item = 0)) {
			cartList.innerHTML += "Empty cart!";
		}

		const removeBtn = document.querySelectorAll(".remove-btn");

		removeBtn.forEach((btn) => {
			btn.addEventListener("click", removeItem);
		});
	});

	// console.log(totalPrice);
}

function removeItem(event) {
	const id = event.target.dataset.id;

	const currentCart = getFromStorage("cart");

	let newCart = currentCart.filter(function (product) {
		console.log(product);

		if (product.productId !== id) {
			return true;
		}
	});
	console.log(newCart);

	getCart(newCart);
	saveToStorage("cart", newCart);
}

getCart(cart);
