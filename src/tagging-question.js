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
      
    `;
  }

  render() {
    return html`
        <div class="tagging-question">
            <div class="qeustion-wrapper">
                <p class="question">Which of the following big ideas would YOU associate with this artistic work?</p>
                <div class="image">
                    <img src="https://art-tec.co.uk/wp-content/uploads/2019/01/Canvas-Vs.-Artistic-Work-Paper.jpg" alt="Artistic work">
                </div>
                </div>
            </div>
        <div class="tag-wrapper">
            <div class="tag" draggable="true" ></div>
        </div>
        <div class="answer-wrapper">

        </div>
        <div class="feedback-wrapper">

        </div>
        <div class="buttons">
            <button class="check-answer" @click="${this.checkAnswer}">Check Answer</button>
            <button class="reset" @click="${this.reset}">Reset</button>
        </div>
    </div>
    `;
  }

  checkAnswer() {

  }

  reset() {

  }

  static get properties() {
    return {

    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);