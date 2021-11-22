import { url } from "../data/api.js";

export default function heroBanner(img) {
	const imgContainer = document.querySelector(".hero-background");

	const heroImg = img.hero_banner.formats.large.url;

	const image = url + heroImg;

	console.log(image);

	imgContainer.style.backgroundImage = `url(${image})`;
}
