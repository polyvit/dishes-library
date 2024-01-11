import { Wrapper } from "../../common/wrapper";
import { Card } from "../card/card";
import "./favs-list.css";

export class FavsList extends Wrapper {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.innerHTML = `
      <h3>Книг в избранном - ${this.appState.favourites.length}</h3>
    `;
    const listEl = document.createElement("div");
    listEl.classList.add("favs_grid");
    if (this.appState.favourites.length) {
      for (const book of this.appState.favourites) {
        listEl.append(new Card(this.appState, book).render());
      }
    }
    this.el.append(listEl);
    return this.el;
  }
}
