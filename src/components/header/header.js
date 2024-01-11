import { Wrapper } from "../../common/wrapper";
import "./header.css";

export class Header extends Wrapper {
  constructor(appState) {
    super();
    this.appState = appState;
  }
  render() {
    this.el.innerHTML = "";
    this.el.classList.add("header");
    this.el.innerHTML = `
      <div>
        <a href="#">
          <img src="/static/Logo.svg" alt="Logo"/>
        </a>
      </div>
      <div class="menu">
        <a class="menu__item" href="#">
          <img src="/static/search.svg" alt="search-icon"/>
          Поиск блюд
        </a>
        <a class="menu__item" href="#favorites">
          <img src="/static/favorites.svg" alt="mark-icon"/>
          Избранное
          <div class="menu__counter">
            ${this.appState.favourites.length}
          </div>
        </a>
      </div>
    `;
    return this.el;
  }
}
