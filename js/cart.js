import { getFromStorage } from "./components/storage.js";

const cart = getFromStorage("cart");

console.log(cart);
