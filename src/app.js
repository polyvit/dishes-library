import { MainView } from "./views/main/main.js";
import { FavView } from "./views/favs/favourite.js";
import { ItemView } from "./views/item/item.js";
import "./app.css";

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavView },
    { path: "#item", view: ItemView },
  ];

  appState = {
    favourites: [],
    itemId: 0,
  };

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    const view = this.routes.find((route) => route.path === location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
