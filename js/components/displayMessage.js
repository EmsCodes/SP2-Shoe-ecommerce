export function displayMessage(type, message, container) {
	const messageContainer = document.querySelector(container);

	messageContainer.innerHTML = `<div class="${type}>${message}</div>"`;
}
