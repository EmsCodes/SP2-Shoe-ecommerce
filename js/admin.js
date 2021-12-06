import { adminMenu, logOut } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { url } from "./data/api.js";
import { displayMessage } from "./components/displayMessage.js";

adminMenu();
logOut();

const token = getToken();

if (!token) {
	window.location.href = "/";
}

const addForm = document.querySelector(".add-form");
const message = document.querySelector(".message-container");
const addTitle = document.querySelector("#title");
const addDescription = document.querySelector("#description");
const addPrice = document.querySelector("#price");
const addProductImg = document.querySelector("#product-img");
const addFeaturedCheckbox = document.querySelector("#featured-checkbox");

addForm.addEventListener("submit", submitAddForm);

// addProductImg.addEventListener("change", (event) => {
// 	let fileList = event.target.files[0];
// 	let file = document.querySelector("input[type=file]").files[0];

//   console.log(fileList);

// 	addProductImg = fileList;
// });

// function findImage() {
// 	const reader = new FileReader();
// 	let file = document.querySelector("input[type=file]").files[0];
// 	// const formData = new FormData();
// 	// const preview = document.querySelector(".preview");

// 	// console.log(formData);

// 	// addProductImg = formData;
// 	reader.addEventListener(
// 		"load",
// 		function () {
// 			// convert image file to base64 string
// 			file = reader.result;
// 			addProductImg = file;

// 			// formData.append("files", file);
// 			// formData.append("ref", "products");
// 			// console.log(file);
// 			// console.log(addProductImg);
// 		},
// 		false
// 	);
// 	// if (file) {
// 	// 	reader.readAsDataURL(file);
// 	// }
// }

// findImage();

function submitAddForm(event) {
	event.preventDefault();

	const titleValue = addTitle.value.trim();
	const descriptionValue = addDescription.value.trim();
	const priceValue = parseFloat(addPrice.value);
	const imgValue = addProductImg.value;

	const featuredProduct = addFeaturedCheckbox.checked;

	if (
		titleValue.length === 0 ||
		descriptionValue.length === 0 ||
		isNaN(priceValue) ||
		!imgValue.length
	) {
		displayMessage("warning", "Invalid input", ".message-container");
	}
	addProduct(
		titleValue,
		descriptionValue,
		priceValue,
		featuredProduct,
		imgValue
	);
}

async function addProduct(title, description, price, featured, image_url) {
	const editUrl = url + "/products";

	const data = JSON.stringify({
		title,
		description,
		price,
		featured,
		image_url,
	});

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await fetch(editUrl, options);
		const result = await response.json();

		if (result.error) {
			console.log(result.error);
		}

		featured = result.featured;

		if (result.created_at) {
			displayMessage("success", "Product created!", message);
		}
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}
