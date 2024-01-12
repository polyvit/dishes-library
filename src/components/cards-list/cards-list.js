import { Wrapper } from "../../common/wrapper";
import { Card } from "../card/card";
import { Pagination } from "../pagination/pagination";
import "./cards-list.css";

export class CardsList extends Wrapper {
  constructor(appState, mainViewState) {
    super();
    this.appState = appState;
    this.state = mainViewState;
  }
  render() {
    if (this.state.loading) {
      this.el.innerHTML = `
        <div class="cards_list__loader">Идет загрузка...</div>
      `;
      return this.el;
    }
    this.el.innerHTML = `
      <h3>Начните поиск</h3>
    `;
    this.el.classList.add("cards_list");
    const listEl = document.createElement("div");
    listEl.classList.add("cards_grid");
    if (this.state.list.length) {
      this.el.innerHTML = `
        <h3>Найдено позиций - ${this.state.totalMenuItems}</h3>
      `;
      for (const item of this.state.list) {
        listEl.append(new Card(this.appState, item).render());
      }
    }
    this.el.append(listEl);
    if (this.state.list.length) {
      this.el.append(new Pagination(this.state).render());
    }
    return this.el;
  }
}
