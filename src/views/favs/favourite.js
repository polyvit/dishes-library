import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { FavsList } from "../../components/favs/favs-list";

export class FavView extends AbstractView {
  constructor(appState) {
    super();
    this.setTitle("Favourites");
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  appStateHook(path) {
    if (path === "favourites") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    this.app.innerHTML = "";
    this.app.append(new FavsList(this.appState).render());
    this.app.append(main);
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
