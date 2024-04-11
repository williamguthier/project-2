import { LitElement, html, css } from 'lit';

export class TaggingQuestion extends LitElement {

  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();

  }

  static get styles() {
    return css`
      :host {

      }
    `;
  }

  render() {

  }

  static get properties() {
    return {

    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);