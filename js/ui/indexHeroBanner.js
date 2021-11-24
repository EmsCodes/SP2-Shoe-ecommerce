import { url } from "../data/api.js";

export default function heroBanner(img, container) {
	const imgContainer = document.querySelector(container);

	const heroImg = img.hero_banner.formats.large.url;

	const image = url + heroImg;

	console.log(image);

	imgContainer.style.backgroundImage = `url(${image})`;
}
