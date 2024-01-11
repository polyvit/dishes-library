import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardsList } from "../../components/cards-list/cards-list.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    totalMenuItems: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.setTitle("Menu items search");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
  }

  appStateHook(path) {
    if (path === "favourites") {
      this.render();
    }
  }
  async stateHook(path) {
    if (path === "searchQuery") {
      this.state.loading = true;
      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.totalMenuItems = data.totalMenuItems;
      this.state.loading = false;
      this.state.list = data.menuItems;
    }
    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  async loadList(q, offset) {
    const res = await fetch(
      `https://api.spoonacular.com/food/menuItems/search?apiKey=70f6b06784bd4dd88b721c489a0d099c&query=${q}&offset=${offset}`,
      {
        "Content-Type": "application/json",
      }
    );
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.append(new Search(this.state).render());
    main.append(new CardsList(this.appState, this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
