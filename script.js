let allTVShows = document.querySelector("#all-shows");
let searchForm = document.querySelector("form");
let searchButton = document.querySelector("form button");
let previousSearch;

function extractFormInput() {
    let formSearchValue = searchForm.elements.query.value;
    fetchTVShows(formSearchValue)
}

async function fetchTVShows(userInput) {
    if (userInput !== previousSearch) {
        allTVShows.innerHTML = "";
    }
    let paramConfig = { params: { q: userInput } }; //added to the query string
    let response = await axios.get("https://api.tvmaze.com/search/shows", paramConfig);
    let allData = await response.data;
    console.log(allData)
    appendData(allData, userInput)
}

function appendData(dataArray, userInput) {
    for (data of dataArray) {
        let link = document.createElement("a");
        let tvShowContainer = document.createElement("div");
        let tvImg = document.createElement("img");
        let tvTitle = document.createElement("p");
        let tvDate = document.createElement("p");
        link.href = data.show.officialSite;
        link.target = "_blank";
        tvImg.src = data.show.image.medium;
        tvTitle.innerText = data.show.name;
        tvDate.innerText = `Premiered : ${data.show.premiered}`;
        allTVShows.append(link)
        link.append(tvShowContainer)
        tvShowContainer.append(tvImg)
        tvShowContainer.append(tvTitle)
        tvShowContainer.append(tvDate)
        tvShowContainer.style.padding = "2.5em";
        tvShowContainer.style.borderRadius = "8px";
        tvShowContainer.style.marginBottom = "3em";
        tvShowContainer.style.textAlign = "center";
        tvShowContainer.style.maxWidth = "20rem"
        tvShowContainer.classList.add("changebg")
        tvShowContainer.addEventListener("mouseover", () => {
            tvDate.style.color = "black"
            tvTitle.style.color = "black"
            tvShowContainer.addEventListener("mouseleave", () => {
                tvDate.style.color = "white"
                tvTitle.style.color = "white"
            })
        })
    }
    previousSearch = userInput
    searchForm.elements.query.value = ""
}

fetchTVShows("marvels")
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    extractFormInput()
    console.log("submitted")
})

