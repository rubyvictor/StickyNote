import { StickyNote } from "./StickyNote";

class StickyNotesApp {
  constructor() {
    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title");

    this.addNoteButton.addEventListener("click", () => this.saveNote());

    this.noteMessageInput.addEventListener("keyup", () => this.toggleButton());

    for (let key in localStorage) {
      this.displayNote(key, localStorage[key]);
    }

    window.addEventListener("storage", e =>
      this.displayNote(e.key, e.newValue)
    );
  }

  saveNote() {
    if (this.noteMessageInput.value) {
      let key = Date.now().toString();
      localStorage.setItem(key, this.noteMessageInput.value);
      this.displayNote(key, this.noteMessageInput.value);
      StickyNotesApp.resetMaterialTextfield(this.noteMessageInput);
      this.toggleButton();
    }
  }

  static resetMaterialTextfield(element) {
    element.value = "";
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
    element.blur();
  }

  displayNote(key, message) {
    let note = document.getElementById(key);

    if (!note) {
      note = document.createElement("sticky-note");
      note.id = key;
      this.notesContainer.insertBefore(
        note,
        this.notesSectionTitle.nextSibling
      );
    }

    if (!message) {
      return note.deleteNote();
    }
    note.setMessage(message);
  }

  toggleButton() {
    if (this.noteMessageInput.value) {
      this.addNoteButton.removeAttribute("disabled");
    } else {
      this.addNoteButton.setAttribute("disabled", "true");
    }
  }
}

module.exports = StickyNotesApp;
