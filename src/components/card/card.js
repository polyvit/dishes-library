import { Wrapper } from "../../common/wrapper";
import "./card.css";

export class Card extends Wrapper {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFav() {
    this.appState.favourites.push(this.cardState);
  }
  #deleteFromFav() {
    this.appState.favourites = this.appState.favourites.filter((book) => {
      book.key !== this.cardState.key;
    });
  }

  render() {
    this.el.classList.add("card");
    const existedInFavourites = this.appState.favourites.find((book) => {
      return book.key === this.cardState.key;
    });

    this.el.innerHTML = `
      <div class="card__image">
        <img alt="Изображение книги" src="https://dummyimage.com/180x144/666666/fff.jpg&text=No+photo"/>
      </div>
      <div class="card__info">
        <div class="card__header">
          <div class="card__tag">
            ${
              this.cardState.subject ? this.cardState.subject[0] : "Отсутствует"
            }
          </div>
          <div class="card__title">
            ${this.cardState.title}
          </div>
          <div class="card__author">
            ${
              this.cardState.author_name
                ? this.cardState.author_name[0]
                : "Автор не известен"
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
        .addEventListener("click", this.#addToFav.bind(this));
    }

    return this.el;
  }
}
