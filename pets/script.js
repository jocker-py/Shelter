//script.js pets
import { SHELTER } from "../assets/data/data.js";

/*Media Query*/
const desktopScreen = window.matchMedia("(min-width: 1280px)").matches;
const mobileScreen = window.matchMedia("(min-width: 0px)").matches;
const tabletScreen = window.matchMedia("(min-width: 768px)").matches;
/*Media Query*/

/*Burger Start*/

const burger = document.querySelector(".burger");
const navigation = document.querySelector(".header__mobile");
const body = document.body;
const blackout = body.querySelector(".blackout");

function toggleMenu() {
    burger.classList.toggle("burger--open");
    burger.classList.toggle("burger--close");
    navigation.classList.toggle("open");
    body.classList.toggle("visible");
    blackout.classList.toggle("visible");
}

burger.addEventListener("click", toggleMenu);
blackout.addEventListener("click", toggleMenu);
navigation.addEventListener('click', toggleMenu);

/*Burger End*/

/*Slider Start*/

const SLIDER = document.querySelector(".slider");

/*Create pages Start*/

// const sliderPages = document.querySelectorAll(".slider__page");

const howMuchPages = () => {
    if (desktopScreen) {
        return 6;
    } else if (tabletScreen) {
        return 8;
    } else {
        return 16;
    }
};

/*Shelter of 48 elements Start*/
const arrayShelter = () => {
    const array = [];
    for (let i = 0; i < 6; i++) {
        SHELTER.forEach((elem) => {
            array.push(elem.id);
        });
    }

    array.sort((a, b) => a + b);
    return array;
};
/*Shelter of 48 elements End*/

/*Create Child Start*/
const createChild = (child) => {
    const pet = SHELTER[child];

    const card = document.createElement("div");
    card.id = pet.id;
    card.classList.add("slider__card");
    card.classList.add("slider__card--flex");
    card.classList.add("card");

    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("card_photo");

    const img = document.createElement("img");
    img.classList.add("card_img");
    img.src = pet.img;
    img.alt = pet.name;
    cardPhoto.appendChild(img);

    const name = document.createElement("h4");
    name.classList.add("card__name");
    name.innerText = pet.name;

    const button = document.createElement("button");
    button.classList.add("card__button");
    button.classList.add("button--secondary");
    button.innerText = "Learn more";

    card.appendChild(cardPhoto);
    card.appendChild(name);
    card.appendChild(button);

    return card;
};
/*Create Child End*/

//
const howMuchToShow = () => {
    if (desktopScreen) {
        return 8;
    } else if (tabletScreen) {
        return 6;
    } else {
        return 3;
    }
};
//

let arrayPets = arrayShelter();
const show = howMuchToShow();
const sliderPages = howMuchPages();
const PAGES = [[],[],[],[]];

SLIDER.innerHTML = "";
let index = arrayPets.length - 1;

for (let page = 0; page < sliderPages; page++) {
    for(let items = 0; items < show; items++){
        if (!PAGES[page]){
            PAGES[page] = [];
        }
        PAGES[page].push([arrayPets[index]]);
        index-- 
    }
    PAGES[page].sort(()=> Math.random() - 0.5);

}

PAGES.sort(() => Math.random() - 0.5);

for(let page in PAGES){
    const sliderPage = document.createElement("div");
    sliderPage.classList.add("slider__page");
    sliderPage.classList.add("slider__page--grid");
    sliderPage.classList.add(`slider__page-${page}`);
    for (let pet of PAGES[page]){
        const newChlid = createChild(pet);
        sliderPage.appendChild(newChlid);
    }
    SLIDER.appendChild(sliderPage); 
}

/*Create pages End*/

/*Paginator Start*/

const BUTTON_RIGHT = document.querySelector(".button__paginator--right");
const BUTTON_LEFT = document.querySelector(".button__paginator--left");
const BUTTON_DOUBLE_RIGHT = document.querySelector(
    ".button__paginator--double-right"
);
const BUTTON_DOUBLE_LEFT = document.querySelector(
    ".button__paginator--double-left"
);
const BUTTON_PAGE = document.querySelector(".button__paginator--page");

let currentPage = 1;

const changeBehavior = (direction, status) => {
    if (direction === "left") {
        if (status === "active") {
            BUTTON_LEFT.classList.remove("button__paginator--inactive");
            BUTTON_DOUBLE_LEFT.classList.remove("button__paginator--inactive");
            BUTTON_LEFT.classList.add("button__paginator--active");
            BUTTON_DOUBLE_LEFT.classList.add("button__paginator--active");

            BUTTON_LEFT.addEventListener("click", moveLeft);
            BUTTON_DOUBLE_LEFT.addEventListener("click", moveLeft);
        } else {
            BUTTON_LEFT.classList.remove("button__paginator--active");
            BUTTON_DOUBLE_LEFT.classList.remove("button__paginator--active");
            BUTTON_LEFT.classList.add("button__paginator--inactive");
            BUTTON_DOUBLE_LEFT.classList.add("button__paginator--inactive");
            BUTTON_LEFT.removeEventListener("click", moveLeft);
            BUTTON_DOUBLE_LEFT.removeEventListener("click", moveLeft);
        }
    } else {
        if (status === "active") {
            BUTTON_RIGHT.classList.remove("button__paginator--inactive");
            BUTTON_DOUBLE_RIGHT.classList.remove("button__paginator--inactive");
            BUTTON_RIGHT.classList.add("button__paginator--active");
            BUTTON_DOUBLE_RIGHT.classList.add("button__paginator--active");
            BUTTON_RIGHT.addEventListener("click", moveRight);
            BUTTON_DOUBLE_RIGHT.addEventListener("click", moveRight);
        } else {
            BUTTON_RIGHT.classList.remove("button__paginator--active");
            BUTTON_DOUBLE_RIGHT.classList.remove("button__paginator--active");
            BUTTON_RIGHT.classList.add("button__paginator--inactive");
            BUTTON_DOUBLE_RIGHT.classList.add("button__paginator--inactive");
            BUTTON_RIGHT.removeEventListener("click", moveRight);
            BUTTON_DOUBLE_RIGHT.removeEventListener("click", moveRight);
        }
    }
};

const moveRight = (event) => {
    if (
        event.target.classList.value
            .split(" ")
            .includes("button__paginator--double-right")
    ) {
        currentPage = howMuchPages();
        changeBehavior("left", "active");
    } else if (currentPage === 1) {
        changeBehavior("left", "active");
        currentPage += 1;
    } else if (currentPage < sliderPages) {
        currentPage += 1;
    } else {
        currentPage = sliderPages;
    }

    BUTTON_PAGE.innerHTML = currentPage;

    if (currentPage === sliderPages) {
        changeBehavior("right", "inactive");
    }

    SLIDER.style.left = `${-(currentPage - 1)}00%`;
};

const moveLeft = (event) => {
    if (
        event.target.classList.value
            .split(" ")
            .includes("button__paginator--double-left")
    ) {
        currentPage = 1;
        changeBehavior("right", "active");
    } else if (currentPage <= sliderPages && currentPage >= 2) {
        changeBehavior("right", "active");
        currentPage -= 1;
    } else {
        currentPage = 1;
    }

    BUTTON_PAGE.innerHTML = currentPage;

    if (currentPage === 1) {
        changeBehavior("left", "inactive");
    }

    SLIDER.style.left = `${-(currentPage - 1) * 100}%`;
};

BUTTON_RIGHT.addEventListener("click", moveRight);
BUTTON_DOUBLE_RIGHT.addEventListener("click", moveRight);

BUTTON_LEFT.addEventListener("click", moveLeft);
BUTTON_DOUBLE_LEFT.addEventListener("click", moveLeft);
/*Paginator End*/

/*Slider End*/

/*Pop-up Start*/
const CARDS = document.querySelectorAll(".slider__card");
const POPUP = document.querySelector(".pop-up");
const HASH = [];

const createPopUp = (child) => {
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up");
    const window = document.createElement("div");
    window.classList.add("pop-up__window");

    const close = document.createElement("div");
    close.classList.add("pop-up__close");

    const card = document.createElement("div");
    card.classList.add("pop-up__card");
    card.classList.add("pop-up__card--flex");

    const photo = document.createElement("div");
    photo.classList.add("pop-up__photo");
    photo.style.backgroundImage = `url(${child.img}`;

    const content = document.createElement("div");
    content.classList.add("pop-up__content");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const text = document.createElement("div");
    text.classList.add("pop-up__text");
    text.classList.add("pop-up__text--flex");

    const name = document.createElement("h3");
    name.classList.add("pop-up__name");
    name.innerText = child.name;
    text.appendChild(name);

    const breed = document.createElement("h4");
    breed.classList.add("pop-up__breed");
    breed.innerText = child.type + " - " + child.breed;
    text.appendChild(breed);

    const description = document.createElement("h5");
    description.classList.add("pop-up__description");
    description.innerText = child.description;
    text.appendChild(description);

    const list = document.createElement("ul");
    list.classList.add("pop-up__list");
    list.classList.add("pop-up__list--flex");

    for (let i of ["Age", "Inoculations", "Diseases", "Parasites"]) {
        const item = document.createElement("li");
        item.classList.add("pop-up__item");

        const span = document.createElement("span");
        span.classList.add(".pop-up__additional");
        span.innerHTML = `<b>${i}</b>: ${child[i.toLowerCase()]}`;
        item.appendChild(span);
        list.appendChild(item);
    }

    text.appendChild(list);
    wrapper.appendChild(text);
    content.appendChild(wrapper);
    card.appendChild(photo);
    card.appendChild(content);

    window.appendChild(close);
    window.appendChild(card);
    popUp.appendChild(window);
    HASH.push(popUp);
};

for (let i = 0; i < 8; i++) {
    createPopUp(SHELTER[i]);
}

const closePopUp = (event) => {
    if (!event.target.closest(".pop-up__card")) {
        POPUP.classList.remove("visible");
        body.classList.remove("visible");
        POPUP.removeEventListener("click", closePopUp);
        
        POPUP.addEventListener('mouseover', (event)=>{
            if(event.target.closest('.pop-up__card')){
                close.classList.remove('hover')
            } else {
                close.classList.add('hover');
            }
            
        })
    }
};

const openPopUp = (event) => {
    const target = event.target.closest(".slider__card");
    POPUP.innerHTML = HASH[target.id].innerHTML;
    POPUP.classList.add("visible");
    body.classList.add("visible");
    POPUP.addEventListener("click", closePopUp);
    const close = document.querySelector('.pop-up__close');

    POPUP.addEventListener('mouseover', (event)=>{
        if(event.target.closest('.pop-up__card')){
            close.classList.remove('hover')
        } else {
            close.classList.add('hover');
        }
        
    })

};

CARDS.forEach((card) => {
    card.addEventListener("click", openPopUp);
});
/*Pop-up End*/
