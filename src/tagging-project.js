import { LitElement, html, css } from 'lit';

export class TaggingProject extends LitElement {

  static get tag() {
    return 'tagging-project';
  }

  constructor() {
    super();
    this.title = 'Which of the following big ideas would YOU associate with this artistic work?';
    this.tagData = [];
    this.questionData();
    this.answersChecked = false;

  }

  static get styles() {
    return css`

        .container {
          text-align: center;
          margin: 0 auto;
          max-width: 600px;
        }

        .question-wrapper {
            margin-bottom: 24px;
        }
        
        .image img {
          width: 600px;
          height: auto;
          border-radius: 12px;
        }

        .question {
          font-size: 16px;
          font-weight: bold;
        }

        .tag-wrapper {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          border-radius: 6px;
          border: 2px solid black;
          cursor: pointer;

        }

        .answer-wrapper {
          border: 2px dashed gray;
          border-radius: 6px;
          margin-bottom: 24px;
        }

        .feedback-wrapper {
            margin-bottom: 20px;
            border-radius: 2px;
            border: 2px solid black;
            border-radius: 6px;
            
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 24px;
        }

        button {
          font-size: 24px;
          font-weight: bold;
          padding: 10px 20px;
          border-radius: 6px;
          border: 2px solid black;
          cursor: pointer;
        }


        .tag.correct {
            background-color: green;
        }

        .tag.incorrect {
            background-color: red;
        }

        .check-answer {
          background-color: green;
        }

        .reset {
          background-color: blue;
        }
        .disabled {
          opacity: 0.5;
          pointer-events: none;
        }

    
    `;
  }

  render() {
    return html`
    <div class="container">
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
                return html` <div class="tag" draggable="true" data-correct="${tagObj.correct}" data-feedback="${tagObj.feedback}" data-tag="${tagObj.tag}" @dragstart="${this.Start}" @click="${this.toggleTag}">
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
            <button class="check-answer ${this.answersChecked ? 'disabled' : ''}" @click="${this.checkAnswer}">Check Answer</button>
            <button class="reset" @click="${this.reset}">Reset</button>
        </div>
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

    const tagWrapper = this.shadowRoot.querySelector('.tag-wrapper');
    const draggedTag = tagWrapper.querySelector(`[data-tag="${data}"]`);
    if (draggedTag) {
      draggedTag.style.display = '';
      draggedTag.setAttribute('draggable', 'true');
      this.appendChild(draggedTag);
    }

    tag.addEventListener('dragstart', (event) => {
      event.stopPropagation();
      event.preventDefault();
      draggedTag.style.display = 'block';
      tag.remove();
    });
    tag.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', tag.dataset.tag);
      tag.classList.add('dragging');
    });
    tag.addEventListener('dragend', (event) => {
      event.preventDefault();
      event.stopPropagation();
      draggedTag.style.display = 'block';
    });
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

    this.answersChecked = true;

    const tags = this.shadowRoot.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.removeAttribute('draggable');
      tag.removeEventListener('click', this.toggleTag);
    });

    const checkAnswerButton = this.shadowRoot.querySelector('.check-answer');
    checkAnswerButton.classList.add('disabled');
}


  reset() {
        const answerArea = this.shadowRoot.querySelector('.answer-wrapper');
        const feedbackArea = this.shadowRoot.querySelector('.feedback-wrapper');
        const checkAnswerButton = this.shadowRoot.querySelector('.check-answer');

        const answerTags = Array.from(answerArea.children);
        answerTags.forEach(tag => {
            this.shadowRoot.querySelector('.tag-wrapper').appendChild(tag);
        });

        feedbackArea.querySelectorAll('div').forEach(feedback => feedback.remove());

        const tags = this.shadowRoot.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.remove('correct', 'incorrect');
            tag.setAttribute('draggable', 'true');
            tag.addEventListener('click', this.toggleTag.bind(this));
        });

        tags.forEach(tag => {
          tag.addEventListener('click', this.toggleTag.bind(this));
        });

        this.answersChecked = false;

        checkAnswerButton.classList.remove('disabled');

        checkAnswerButton.disabled = false;
  }

  toggleTag(event) {
    if (!this.answersChecked) {
    const tag = event.target;
    const answerArea = this.shadowRoot.querySelector('.answer-wrapper');
    const tagWrapper = this.shadowRoot.querySelector('.tag-wrapper');


      if (tag.parentNode === answerArea) {
        tagWrapper.appendChild(tag);
      } else {
        answerArea.appendChild(tag);
        }
    }
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

globalThis.customElements.define(TaggingProject.tag, TaggingProject);