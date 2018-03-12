import { StickyNoteApp } from "StickyNoteApp";

class StickyNote extends HTMLElement {
  createdCallback() {
    this.classList.add(...StickyNote.CLASSES);
    this.innerHTML = StickyNote.TEMPLATE;
    this.messageElement = this.querySelector(".message");
    this.dateElement = this.querySelector(".date");
    this.deleteButton = this.querySelector(".delete");
    this.deleteButton.addEventListener("click", () => this.deleteNote());
  }

  attributeChangedCallback(attributeName) {
    if (attributeName == "id") {
      let date;
      if (this.id) {
        date = new Date(parseInt(this.id));
      } else {
        date = new Date();
      }

      let dateFormatterOptions = { day: "numeric", month: "short" };
      let shortDate = new Intl.DateTimeFormat(
        "en-US",
        dateFormatterOptions
      ).format(date);
      this.dateElement.textContent = `Created on ${shortDate}`;
    }
  }

  setMessage(message) {
    this.messageElement.textContent = message;
    this.messageElement.innerHTML = this.messageElement.innerHTML.replace(
      /\n/g,
      "<br>"
    );
  }

  deleteNote() {
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this);
  }
}

// Initial content of the element.
StickyNote.TEMPLATE = `<div class="message"></div>
  <div class="date"></div>
  <button class="delete mdl-button mdl-js-button mdl-js-ripple-effect">
  Delete
  </button>`;

// StickyNote elements top level style classes.
StickyNote.CLASSES = [
  "mdl-cell--4-col-desktop",
  "mdl-card__supporting-text",
  "mdl-cell--12-col",
  "mdl-shadow--2dp",
  "mdl-cell--4-col-tablet",
  "mdl-card",
  "mdl-cell",
  "sticky-note"
];

document.registerElement("sticky-note", StickyNote);

module.exports = StickyNote;
