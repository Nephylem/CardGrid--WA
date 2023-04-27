import { CardGenerator, SwiperGenerator } from "./modules/module.js";

// SwiperGenerator - initializes the function for image slider
// CardGenerator - generates card components from fetched data

function saveJson(data) {
  const mappedData = Object.entries(data).forEach(([key, value]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
}

// fetch data using GET request and save to session storage using function saveJson
let url = "http://localhost:3000/cards";
fetch(url, {
  method: "GET",
})
  .then((res) => res.json())
  .then((json) => saveJson(json))
  .catch((err) => {
    alert("Failed to fetch json data");
  });

// generating card components using function CardGenerator
let container = document.querySelector(".block__grid--primary");

for (let i = 0; i < 10; i++) {
  let data = JSON.parse(sessionStorage.getItem(i));
  let card = CardGenerator(data, i);

  container.append(card);
  SwiperGenerator(i);
}

// filter function

let input = document.querySelector(".block__filter input");
let select = document.querySelector(".block__filter select");
let reset = document.querySelector(".block__filter button");
let cards = document.querySelectorAll(".block__grid--card");
input.addEventListener("input", () => {
  let query = input.value.toLowerCase();

  cards.forEach((card, i) => {
    let name = card.dataset.name.toLowerCase();
    if (name.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

select.addEventListener("change", () => {
  let tag = select.value;
  cards.forEach((card, i) => {
    let tags = card.dataset.tags.toLowerCase();
    if (tags.includes(tag)) {
      card.style.display = "block";
      console.log(true);
    } else {
      card.style.display = "none";
    }
  });
});

reset.addEventListener("click", () => {
  cards.forEach((card) => {
    card.style.display = "block";
  });
});
