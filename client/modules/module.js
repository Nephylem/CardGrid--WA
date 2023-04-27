// components of card
function block__grid(key = null) {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    `block__grid--card card__key--${key != null ? key : ""}`
  );
  return div;
}

// heart button
function button__heart(key = null) {
  let button = document.createElement("button");
  button.setAttribute("class", "btn--favorite");
  let icon = document.createElement("i");
  icon.setAttribute(
    "class",
    `fa-regular fa-heart key--${key != null ? key : ""}`
  );

  button.append(icon);

  button.addEventListener("click", () => {
    if (icon.getAttribute("class") === `fa-regular fa-heart key--${key}`) {
      icon.setAttribute("class", `fas fa-heart key--${key != null ? key : ""}`);
    } else {
      icon.setAttribute(
        "class",
        `fa-regular fa-heart key--${key != null ? key : ""}`
      );
    }
  });
  return button;
}

// image slider

function image__slider(imgArray, key = null) {
  let containerEl = document.createElement("div");
  containerEl.setAttribute("class", `area__img swiper-container`);
  containerEl.setAttribute("data-swiper", `swiper-${key}`);
  let wrapperEl = document.createElement("div");
  wrapperEl.setAttribute("class", "area__img--wrapper swiper-wrapper");
  let navNext = document.createElement("div");
  navNext.setAttribute("class", "swiper-button-next");
  navNext.setAttribute("data-swiper", `next-swiper-${key}`);
  let navPrev = document.createElement("div");
  navPrev.setAttribute("class", "swiper-button-prev");
  navPrev.setAttribute("data-swiper", `prev-swiper-${key}`);

  for (let img of imgArray) {
    let div = document.createElement("div");
    div.setAttribute("class", "area__image--block swiper-slide");
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", img);
    div.appendChild(imgEl);
    wrapperEl.appendChild(div);
  }

  containerEl.append(wrapperEl);
  containerEl.append(navNext, navPrev);

  return containerEl;
}

// title
function card__title(title) {
  let div = document.createElement("div");
  div.setAttribute("class", "area area__title");
  div.append(title);
  return div;
}
function card__address(address) {
  let div = document.createElement("div");
  div.setAttribute("class", "area area__address");
  let logo = document.createElement("i");
  logo.setAttribute("class", "fa fa-location-dot");
  div.append(logo, ` ${address}`);

  return div;
}

// tags
function card__tags(tags) {
  let div = document.createElement("div");

  div.setAttribute("class", "area area__tags");
  for (let tag of tags) {
    let aEl = document.createElement("a");
    aEl.append(tag);
    div.append(aEl);
  }
  return div;
}

// description
function card__description(description) {
  let div = document.createElement("div");
  div.setAttribute("class", "area area__description");
  div.append(description);

  return div;
}

// bottom grid
function bottom__grid(price, reviews) {
  let div = document.createElement("div");
  div.setAttribute("class", "area area__grid");

  let areaPrice = document.createElement("div");
  areaPrice.setAttribute("class", "area area__price");
  let areaReviews = document.createElement("div");
  areaReviews.setAttribute("class", "area area__reviews");

  let logoReviews = document.createElement("i");
  logoReviews.setAttribute("class", "far fa-thumbs-up");

  let span_rating = document.createElement("span");
  span_rating.setAttribute("class", "span__rating");
  let span_people = document.createElement("span");
  span_people.setAttribute("class", "span__people");

  span_rating.append(` ${reviews.total}%`);
  span_people.append(` (${reviews.poll})`);

  let starBlock = document.createElement("div");
  starBlock.setAttribute("class", "area__stars");
  let starLogo = document.createElement("i");
  starLogo.setAttribute("class", "far fa-star");

  for (let i = 0; i < 5; i++) {
    var clonedElement = starLogo.cloneNode(true);
    starBlock.appendChild(clonedElement);
  }

  areaReviews.append(logoReviews, span_rating, span_people);
  areaPrice.append(`$ ${price.toLocaleString()}`);

  //   append all elements inside div classname area__grid

  div.append(areaPrice, areaReviews, starBlock);

  return div;
}

// function to initialize swiperJS

function SwiperGenerator(key) {
  let swiper = new Swiper(`[data-swiper="swiper-${key}"]`, {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: `[data-swiper="next-swiper-${key}"]`,
      prevEl: `[data-swiper="prev-swiper-${key}"]`,
    },
  });
}

// function to generate single card

function CardGenerator(data, key) {
  //   card block
  //   data title as key name
  let card = block__grid(data.title);

  //   contents of card
  let btn_heart = button__heart(key);
  let image_slider = image__slider(data.image, key);
  let card_title = card__title(data.title);
  let card_description = card__description(data.description);
  let card_address = card__address(data.address);
  let card_tags = card__tags(data.tags);
  let bottom_grid = bottom__grid(data.price, data.rating);
  card.append(
    btn_heart,
    image_slider,
    card_title,
    card_address,
    card_tags,
    card_description,
    bottom_grid
  );
  return card;
}

// export the functions
export { CardGenerator, SwiperGenerator };
