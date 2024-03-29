import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { ItemInfo } from "../../components/item/itemInfo";

export class ItemView extends AbstractView {
  state = {
    item: {},
    loading: false,
  };

  constructor(appState) {
    super();
    this.setTitle("Item info");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    if (this.appState.itemId) {
      this.loadDetails(this.appState.itemId);
    }
  }

  appStateHook(path) {
    if (path === "favourites") {
      this.render();
    }
  }

  stateHook(path) {
    if (path === "item" || path === "loading") {
      this.render();
    }
  }

  async loadDetails(id) {
    this.state.loading = true;
    const res = await fetch(
      `https://api.spoonacular.com/food/menuItems/${id}?apiKey=70f6b06784bd4dd88b721c489a0d099c`,
      {
        "Content-Type": "application/json",
      }
    );
    this.state.loading = false;
    this.state.item = await res.json();
  }

  render() {
    const main = document.createElement("div");
    this.app.innerHTML = "";
    main.append(new ItemInfo(this.appState, this.state).render());
    this.app.append(main);
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
