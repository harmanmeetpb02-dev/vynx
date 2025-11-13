// index.html
//variables and querySelector
const search = document.querySelector(".search");
const nav = document.querySelector("nav");
const navCenter = document.querySelector(".nav-center");
const input = document.querySelector("input");
const cards = document.querySelector(".card");
const card = document.querySelector(".cards");
let datas = [];

//function
async function getData() {
    try {
        let res = await fetch("./data/data.json");
        let data = await res.json();
        data.forEach((item) => {
            datas.push(item);

        });
        showCards();
    } catch (err) {
        console.log(err);
    }
}
function showCards() {
    cards.innerHTML = ""; // clear existing cards

    datas.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cards");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title || "movie poster";

        div.appendChild(img);
        div.addEventListener("click", () => {
            localStorage.clear();
            localStorage.setItem("selectedMovie", item.no);
            window.location.href = "./pages/movie.html";
        });

        cards.appendChild(div);
    });
}

function searchinp() {
    cards.innerHTML = "";
    datas.filter((item) => {
        if (item.title.toLowerCase().startsWith(input.value.toLowerCase())) {
            const div = document.createElement("div");
        div.classList.add("cards");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title || "movie poster";

        div.appendChild(img);
        div.addEventListener("click", () => {
            localStorage.clear();
            localStorage.setItem("selectedMovie", item.no);
            window.location.href = "./pages/movie.html";
        });

        cards.appendChild(div);
        }
    })
}

input.addEventListener("input", () => {
    searchinp();
});

//function call
getData();
//
//
//
//
//movie.html
//variables and querySelector
const hero = document.querySelector(".hero");
const searchbar = document.querySelector(".movie-search");

//function
async function getmData() {
    try {
        let res = await fetch("../data/data.json");
        let data = await res.json();
        data.forEach((item) => {
            if (item.no == localStorage.getItem("selectedMovie")) {
                hero.innerHTML = `<div class="left-video">
                <video src="${item.source}" controls></video>
            </div>
            <div class="right-video">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>`;
            }
        });
    } catch (err) {
        console.log(err);
    }
}

if (searchbar) {
    searchbar.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}


//function call
getmData();