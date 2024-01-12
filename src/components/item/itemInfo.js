import { Wrapper } from "../../common/wrapper";
import "./itemInfo.css";

export class ItemInfo extends Wrapper {
  constructor(appState, localState) {
    super();
    this.appState = appState;
    this.state = localState;
  }

  checkInFavs() {
    return this.appState.favourites.find(
      (fav) => fav.id === this.state.item.id
    );
  }

  addToFavs = (e) => {
    if (!e.target.classList.contains("item__button_active")) {
      this.appState.favourites.push(this.state.item);
    }
  };

  render() {
    if (this.state.loading) {
      this.el.innerHTML = `
        <div class="cards_list__loader">Идет загрузка...</div>
      `;
      return this.el;
    }
    if (this.state.item.title) {
      this.el.innerHTML = `
        <div class="item__info">
          <img src=${this.state.item.image} alt="Image"/>
          <div>
            <h3>${this.state.item.title}</h3>
            <p>Restaurant chain: <b>${this.state.item.restaurantChain}</b></p>
            <button class="item__button ${
              this.checkInFavs() ? "item__button_active" : ""
            }">${this.checkInFavs() ? "В избранном" : "В избранное"}</button>
          </div>
        </div>
        <div>
          <table>
            <tr>
              ${this.state.item.nutrition.nutrients.map((n) => {
                return `
                  <th>${n.name}</th>
                `;
              })}
            </tr>
            <tr>
              ${this.state.item.nutrition.nutrients.map((n) => {
                return `
                  <td>${n.amount}</td>
                `;
              })}
            </tr>
          </table>
        </div>
      `;
      this.el
        .querySelector(".item__button")
        .addEventListener("click", this.addToFavs);
    }

    return this.el;
  }
}
