console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
    let allBreeds = []; // Store all breeds for filtering

    // Fetch and display random dog images
    function fetchDogImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                imageContainer.innerHTML = ""; // Clear existing images
                data.message.forEach(imgSrc => {
                    const imgElement = document.createElement("img");
                    imgElement.src = imgSrc;
                    imgElement.alt = "Random Dog";
                    imgElement.style.width = "200px";
                    imgElement.style.margin = "5px";
                    imgElement.style.borderRadius = "10px";
                    imageContainer.appendChild(imgElement);
                });
            })
            .catch(error => console.error("Error fetching images:", error));
    }

    // Fetch and display dog breeds
    function fetchDogBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                allBreeds = Object.keys(data.message); // Store breeds
                renderBreeds(allBreeds); // Render all breeds initially
            })
            .catch(error => console.error("Error fetching breeds:", error));
    }

    // Function to render breeds in the list
    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear previous breeds
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer"; // Indicate clickable

            // Change text color when clicked
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change to any color you like
            });

            breedList.appendChild(li);
        });
    }

    // Event listener for filtering breeds
    breedDropdown.addEventListener("change", () => {
        const selectedLetter = breedDropdown.value; // Get selected letter
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds); // Render only matching breeds
    });

    // Load images and breeds on page load
    fetchDogImages();
    fetchDogBreeds();
});
