import { Wrapper } from "../../common/wrapper";
import "./card.css";

export class Card extends Wrapper {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFav = (e) => {
    e.stopPropagation();
    this.appState.favourites.push(this.cardState);
  };

  #deleteFromFav() {
    this.appState.favourites = this.appState.favourites.filter((book) => {
      book.key !== this.cardState.key;
    });
  }
  #searchDetails() {
    this.appState.itemId = this.cardState.id;
    if (!location.hash) {
      location.replace(`${location.href}#item`);
    } else {
      location.replace(`${location.href.split("#")[0]}#item`);
    }
  }

  render() {
    this.el.classList.add("card");
    const existedInFavourites = this.appState.favourites.find((item) => {
      return item.id === this.cardState.id;
    });
    this.el.addEventListener("click", this.#searchDetails.bind(this));

    this.el.innerHTML = `
      <div class="card__image">
        <img alt="Изображение" src="${this.cardState.image}"/>
      </div>
      <div class="card__info">
        <div class="card__header">
          <div class="card__title">
            ${this.cardState.title}
          </div>
          <div class="card__author">
            ${
              this.cardState.restaurantChain
                ? this.cardState.restaurantChain
                : "Отсутствует"
            }
          </div>
        </div>
        <div class="card__footer">
          <button class="button__add ${
            existedInFavourites ? "button__active" : ""
          }">
            ${
              existedInFavourites
                ? "<img src='/static/favorites.svg'/>"
                : "<img src='/static/favorite-white.svg'/>"
            }
          </button>
        </div>
      </div>
    `;
    if (existedInFavourites) {
      this.el
        .querySelector(".button__add")
        .addEventListener("click", this.#deleteFromFav.bind(this));
    } else {
      this.el
        .querySelector(".button__add")
        .addEventListener("click", this.#addToFav);
    }

    return this.el;
  }
}
