"use Strict";

class StickyNotesApp {
  constructor() {
    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title");

    // Saves notes on button click.
    this.addNoteButton.addEventListener("click", this.saveNote.bind(this));

    // Toggle for the button.
    this.noteMessageInput.addEventListener(
      "keyup",
      this.toggleButton.bind(this)
    );

    // Loads all the notes.
    for (var key in localStorage) {
      this.displayNote(key, localStorage[key]);
    }

    // Listen for updates to notes from other windows.
    window.addEventListener(
      "storage",
      function(e) {
        this.displayNote(e.key, e.newValue);
      }.bind(this)
    );
  }
}
