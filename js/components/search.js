// Function to display search form onclick

const searchBar = document.querySelector(".search-bar");

export function displaySearchBar() {
	if (searchBar.style.display === "none") {
		searchBar.style.display = "block";
		document.querySelector("#search").focus();
	} else {
		searchBar.style.display = "none";
	}
}
