/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use Strict";

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

window.addEventListener("load", () => new StickyNotesApp());

class StickyNote extends HTMLElement {
  createdCallback() {
    StickyNote.CLASSES.forEach(
      function(klass) {
        this.classList.add(klass);
      }.bind(this)
    );
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
      let month = StickyNote.MONTHS[date.getMonth()];
      this.dateElement.textContent =
        "Created on " + month + " " + date.getDate();
    }
  }

  setMessage(message) {
    this.messageElement.textContent = message;
    // Replace all line breaks by <br>.
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
StickyNote.TEMPLATE =
  '<div class="message"></div>' +
  '<div class="date"></div>' +
  '<button class="delete mdl-button mdl-js-button mdl-js-ripple-effect">' +
  "Delete" +
  "</button>";

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

// List of shortened month names.
StickyNote.MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

document.registerElement("sticky-note", StickyNote);
