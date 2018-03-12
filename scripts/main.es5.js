"use strict";
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StickyNote = require("./StickyNote.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StickyNotesApp = function () {
  function StickyNotesApp() {
    var _this = this;

    _classCallCheck(this, StickyNotesApp);

    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title");

    this.addNoteButton.addEventListener("click", function () {
      return _this.saveNote();
    });

    this.noteMessageInput.addEventListener("keyup", function () {
      return _this.toggleButton();
    });

    for (var key in localStorage) {
      this.displayNote(key, localStorage[key]);
    }

    window.addEventListener("storage", function (e) {
      return _this.displayNote(e.key, e.newValue);
    });
  }

  _createClass(StickyNotesApp, [{
    key: "saveNote",
    value: function saveNote() {
      if (this.noteMessageInput.value) {
        var key = Date.now().toString();
        localStorage.setItem(key, this.noteMessageInput.value);
        this.displayNote(key, this.noteMessageInput.value);
        StickyNotesApp.resetMaterialTextfield(this.noteMessageInput);
        this.toggleButton();
      }
    }
  }, {
    key: "displayNote",
    value: function displayNote(key, message) {
      var note = document.getElementById(key);

      if (!note) {
        note = document.createElement("sticky-note");
        note.id = key;
        this.notesContainer.insertBefore(note, this.notesSectionTitle.nextSibling);
      }

      if (!message) {
        return this.note.StickyNote.deleteNote();
      }
      this.note.StickyNote.setMessage(message);
    }
  }, {
    key: "toggleButton",
    value: function toggleButton() {
      if (this.noteMessageInput.value) {
        this.addNoteButton.removeAttribute("disabled");
      } else {
        this.addNoteButton.setAttribute("disabled", "true");
      }
    }
  }], [{
    key: "resetMaterialTextfield",
    value: function resetMaterialTextfield(element) {
      element.value = "";
      element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
      element.blur();
    }
  }]);

  return StickyNotesApp;
}();

window.addEventListener("load", function () {
  return new StickyNotesApp();
});

module.exports = StickyNotesApp;

//# sourceMappingURL=main.es5.js.map