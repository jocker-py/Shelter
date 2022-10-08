// script.js for main
import { SHELTER } from "../assets/data/data.js";

/*Media Query*/
const mobileScreen = window.matchMedia("(max-width: 767px)").matches;
const tabletScreen = window.matchMedia("(max-width: 1279px)").matches;
/*Media Query*/

/*Burger Start*/
const body = document.body;
const burger = body.querySelector(".burger");
const navigation = body.querySelector(".header__mobile");
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
const BUTTON_LEFT = document.querySelector(".button__arrow--left");
const BUTTON_RIGHT = document.querySelector(".button__arrow--right");
const SLIDER = document.querySelector(".slider__bar");
const ITEM_LEFT = document.querySelector(".slider__item--left");
const ITEM_RIGHT = document.querySelector(".slider__item--right");
const ITEM_ACTIVE = document.querySelector(".slider__item--active");
let petsShown = [];

/*How much to Show Start*/
const getValue = () => {
    if (mobileScreen) {
        return 1;
    } else if (tabletScreen) {
        return 2;
    } else {
        return 3;
    }
};

/*How much to Show End*/

/*Random choose Start*/
const choosePet = () => {
    let index;
    while (true) {
        index = Math.floor(Math.random() * 8);
        if (!petsShown.includes(SHELTER[index].name)) {
            petsShown.push(SHELTER[index].name);
            break;
        }
    }

    return SHELTER[index];
};
/*Random choose End*/

/*Create Child Start*/
const createChild = () => {
    const pet = choosePet();
    const card = document.createElement("div");
    card.id = pet.id;
    card.classList.add("slider__card");
    card.classList.add("card");

    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("card_photo");

    const img = document.createElement("img");
    img.classList.add("card_img");
    img.src = pet.img;
    img.alt = pet.name;
    cardPhoto.appendChild(img);

    const name = document.createElement("p");
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
/*Create Child Start*/

/*Create TeamBlock Start*/
function createTeamplate(itemBlock) {
    itemBlock.innerHTML = "";
    let show = getValue();

    for (let child = 0; child < show; child++) {
        const newChild = createChild();
        itemBlock.appendChild(newChild);
    }
}

for (let each of [ITEM_ACTIVE, ITEM_RIGHT]) {
    createTeamplate(each);
}
ITEM_LEFT.innerHTML = ITEM_RIGHT.innerHTML;
/*Create TeamBlock End*/

const moveLeft = () => {
    SLIDER.classList.add("transition-left");
    BUTTON_LEFT.removeEventListener("click", moveLeft);
    BUTTON_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    SLIDER.classList.add("transition-right");
    BUTTON_RIGHT.removeEventListener("click", moveRight);
    BUTTON_LEFT.removeEventListener("click", moveLeft);
};

BUTTON_LEFT.addEventListener("click", moveLeft);
BUTTON_RIGHT.addEventListener("click", moveRight);

SLIDER.addEventListener("animationend", (event) => {
    let moveDirection;

    if (
        ["move-left", "move-left-mobile", "move-left-tablet"].includes(
            event.animationName
        )
    ) {
        console.log(event);
        SLIDER.classList.remove("transition-left");
        moveDirection = ITEM_LEFT;
        ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML;

        petsShown = [];
        ITEM_LEFT.querySelectorAll(".card__name").forEach((name) => {
            petsShown.push(name.innerHTML);
        });
    } else {
        SLIDER.classList.remove("transition-right");
        moveDirection = ITEM_RIGHT;
        ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
        petsShown = [];
        ITEM_RIGHT.querySelectorAll(".card__name").forEach((name) => {
            petsShown.push(name.innerHTML);
        });
    }

    const oldItems = moveDirection.innerHTML;
    ITEM_ACTIVE.innerHTML = oldItems;

    createTeamplate(moveDirection);

    BUTTON_LEFT.addEventListener("click", moveLeft);
    BUTTON_RIGHT.addEventListener("click", moveRight);
});

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

        POPUP.addEventListener("mouseover", (event) => {
            if (event.target.closest(".pop-up__card")) {
                close.classList.remove("hover");
            } else {
                close.classList.add("hover");
            }
        });
    }
};

const openPopUp = (event) => {
    if (event.target.closest(".slider__card")) {
        const target = event.target.closest(".slider__card");
        POPUP.innerHTML = HASH[target.id].innerHTML;
        POPUP.classList.add("visible");
        body.classList.add("visible");

        POPUP.addEventListener("click", closePopUp);
        const close = document.querySelector(".pop-up__close");

        POPUP.addEventListener("mouseover", (event) => {
            if (event.target.closest(".pop-up__card")) {
                close.classList.remove("hover");
            } else {
                close.classList.add("hover");
            }
        });
    }
};

SLIDER.addEventListener("click", openPopUp);

/*Pop-up End*/
