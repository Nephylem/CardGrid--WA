import { CardGenerator, SwiperGenerator } from "./modules/module.js";

// SwiperGenerator - initializes the function for image slider
// CardGenerator - generates card components from fetched data

function saveJson(data) {
  const mappedData = Object.entries(data).forEach(([key, value]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
}

// fetch data and save to session storage using function saveJson
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
