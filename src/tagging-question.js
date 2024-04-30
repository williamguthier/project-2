import { LitElement, html, css } from 'lit';

export class TaggingQuestion extends LitElement {

  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.title = 'Which of the following big ideas would YOU associate with this artistic work?';
    this.tagData = [];
    this.questionData();

  }

  static get styles() {
    return css`

        .answer-wrapper {
        
        }

        .feedback-wrapper {
            border-radius: 2px;
            
        }
        .tag.correct {
            background-color: green;
        }

        .tag.incorrect {
            background-color: red;
        }

    
    `;
  }

  render() {
    return html`
        <div class="tagging-question">
            <div class="question-wrapper">
                <div class="image">
                    <img src="https://art-tec.co.uk/wp-content/uploads/2019/01/Canvas-Vs.-Artistic-Work-Paper.jpg" alt="Artistic work">
                    <div class="question">Question: ${this.title}</div>
                </div>
                </div>
            </div>
        <div class="tag-wrapper">
            ${this.tagData.map(tagObj => {
                return html` <div class="tag" draggable="true" data-correct="${tagObj.correct}" data-feedback="${tagObj.feedback}" data-tag="${tagObj.tag}" @dragstart="${this.Start}">
            ${tagObj.tag}</div>`;
            })}
        </div>
        <div class="answer-wrapper" @dragover="${this.DragOver}" @drop="${this.Drop}">
            Drop Answers Here
        </div>
        <div class="feedback-wrapper">
            Feedback:
        </div>
        <div class="buttons">
            <button class="check-answer" @click="${this.checkAnswer}">Check Answer</button>
            <button class="reset" @click="${this.reset}">Reset</button>
        </div>
    </div>
    `;
  }

  Start(event) {
    const tag = event.target;
    event.dataTransfer.setData('text/plain', tag.dataset.tag);
    tag.classList.add('dragging');
  }

  DragOver(event) {
    event.preventDefault();
  }

  Drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const tag = document.createElement('div');
    tag.textContent = data;
    tag.classList.add('tag');
    tag.setAttribute('draggable', 'true');
    event.target.appendChild(tag);
  }

  checkAnswer() {
    const answerArea = this.shadowRoot.querySelector('.answer-wrapper');
    const feedbackArea = this.shadowRoot.querySelector('.feedback-wrapper');
    const answerTags = Array.from(answerArea.children);

    answerTags.forEach(tag => {
        const tagData = this.tagData.find(data => data.tag === tag.textContent.trim());
        if (tagData) {
            if (tagData.correct) {
                tag.classList.add('correct');
            } else {
                tag.classList.add('incorrect');
                const feedback = document.createElement('div');
                feedback.textContent = tagData.feedback;
                feedbackArea.appendChild(feedback);
            }
        }
    });
}


  reset() {
        const answerArea = this.shadowRoot.querySelector('.answer-wrapper');
        const feedbackArea = this.shadowRoot.querySelector('.feedback-wrapper');
        const checkAnswerButton = this.shadowRoot.querySelector('.check-answer');

        const answerTags = Array.from(answerArea.children);
        answerTags.forEach(tag => {
            tag.remove();
        });

        feedbackArea.innerHTML = '';

        const tags = this.shadowRoot.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.remove('correct', 'incorrect');
        });
        checkAnswerButton.disabled = false;
  }

  static get properties() {
    return {
        title: {type: String},
        tagData: {type: Array},
    };
  }
  questionData() {
    this.tagData = [
        {"tag": "good form", "correct": true, "feedback": "The shape of the vase clearly demonstrates craftsmanship"},
        {"tag": "poor taste", "correct": false, "feedback": "Taste is in the eye of the designer as well as the viewer."},
        {"tag": "contrasting themes", "correct": false, "feedback": "There is uniformity in the shape, but there is no depth to this media to imply that it is contrasting with other figures."},
        {"tag": "AI", "correct": true, "feedback": "While a modification of prior work, this is still AI generative work."},
        {"tag": "shading", "correct": false, "feedback": "While there is a light source and a shadow cast, shading is a term used for pencil based sketching."},
        {"tag": "original work", "correct": true, "feedback": "This character is not based on any person, place, or existing trope."},
        {"tag": "accessible", "correct": false, "feedback": "The color scheme, while high contrast in some areas, loses form in others and has written text unrelated to the character."}
  ];

  this.shuffleTagData();
  }

  shuffleTagData() {
    this.tagData.sort(() => Math.random() - 0.5);
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);