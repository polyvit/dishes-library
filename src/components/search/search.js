import { Wrapper } from "../../common/wrapper";
import "./search.css";

export class Search extends Wrapper {
  constructor(mainViewState) {
    super();
    this.state = mainViewState;
  }

  search() {
    const value = this.el.querySelector("input").value;
    this.state.searchQuery = value;
  }

  render() {
    this.el.innerHTML = "";
    this.el.classList.add("search");
    this.el.innerHTML = `
      <div class="search__wrapper">
        <img src="/static/search.svg" alt="search-icon"/>
        <input 
          type="text" 
          class="search__input" 
          placeholder="Найти книгу или автора...."
          value="${this.state.searchQuery ? this.state.searchQuery : ""}"
        />
      </div>
      <button aria-label="Искать" class="search__btn">
        <img src="/static/search-white.svg" alt="search-icon"/>
      </button>
    `;
    this.el
      .querySelector("button")
      .addEventListener("click", this.search.bind(this));
    this.el.querySelector("input").addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        this.search();
      }
    });
    return this.el;
  }
}
