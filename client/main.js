import {
  CardGenerator,
  SwiperGenerator,
  FilterResult,
} from "./modules/module.js";

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
  .then((json) => {
    saveJson(json);

    // generating card components using function CardGenerator
    let container = document.querySelector(".block__grid--primary");

    for (let i = 0; i < 10; i++) {
      let data = JSON.parse(sessionStorage.getItem(i));
      let card = CardGenerator(data, i);

      container.append(card);
      SwiperGenerator(i);
    }

    // filter function
    let input = ".block__filter input";
    let select = ".block__filter select";
    let reset = ".block__filter button";
    let cards = ".block__grid--card";

    FilterResult(input, select, reset, cards);
  })
  .catch((err) => {
    alert("Failed to fetch json data: Server is closed.");

    // Re-run generating card components using function CardGenerator
    let container = document.querySelector(".block__grid--primary");

    for (let i = 0; i < 10; i++) {
      let data = JSON.parse(sessionStorage.getItem(i));
      let card = CardGenerator(data, i);

      container.append(card);
      SwiperGenerator(i);
    }

    // filter function
    let input = ".block__filter input";
    let select = ".block__filter select";
    let reset = ".block__filter button";
    let cards = ".block__grid--card";

    FilterResult(input, select, reset, cards);
  });
