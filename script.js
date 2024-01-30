const accessKey = "TXvyAUPgHCiWJ_hJ4vjMc0x_9LJPdXq2f2TcOxGBq6Q"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()
    // Clear the previous results and display loading message while waiting for images to load
    const results = data.results

    if (page === 1){
        searchResults.innerHTML = ""
    }
    results.map((result) =>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault()
    page = 1;
    searchImages()
})

formEl.addEventListener("click", () =>{
    searchImages()
})