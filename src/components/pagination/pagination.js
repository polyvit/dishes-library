import { Wrapper } from "../../common/wrapper";
import "./pagination.css";

export class Pagination extends Wrapper {
  constructor(mainViewState) {
    super();
    this.state = mainViewState;
  }

  #changeOffset = (e) => {
    if (e.target.dataset.arrow === "plus") {
      this.state.offset += 1;
    } else {
      this.state.offset -= 1;
    }
  };

  render() {
    this.el.innerHTML = "";
    this.el.classList.add("pagination");
    this.el.innerHTML = `
      <a data-arrow="minus">
        <img src="/static/arrow_left.svg" alt="arrow"/>
        Previous page
      </a>
      <a data-arrow="plus">
        Next page
        <img src="/static/right_arrow.svg" alt="arrow"/>
      </a>
    `;
    this.el
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", this.#changeOffset));
    return this.el;
  }
}
