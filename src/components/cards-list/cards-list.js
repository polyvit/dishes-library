import { Wrapper } from "../../common/wrapper";
import { Card } from "../card/card";
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
    this.el.classList.add("cards_list");
    this.el.innerHTML = `
      <h3>Найдено книг - ${this.state.numFound}</h3>
    `;
    const listEl = document.createElement("div");
    listEl.classList.add("cards_grid");
    if (this.state.list.length) {
      for (const book of this.state.list) {
        listEl.append(new Card(this.appState, book).render());
      }
    }
    this.el.append(listEl);
    return this.el;
  }
}
