import { Wrapper } from "../../common/wrapper";
import "./itemInfo.css";

export class ItemInfo extends Wrapper {
  constructor(appState, localState) {
    super();
    this.appState = appState;
    this.state = localState;
  }

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
          </div>
        </div>
      `;
    }
    return this.el;
  }
}
