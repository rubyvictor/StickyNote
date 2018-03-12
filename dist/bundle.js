/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/main.es6.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/main.es6.js":
/*!*****************************!*\
  !*** ./scripts/main.es6.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\"use Strict\";\n\nconst StickyNotesApp = __webpack_require__(/*! ../src/StickyNotesApp */ \"./src/StickyNotesApp.js\");\nconst StickyNote = __webpack_require__(/*! ../src/StickyNote */ \"./src/StickyNote.js\");\n\nwindow.addEventListener(\"load\", () => new StickyNotesApp());\n\ndocument.registerElement(\"sticky-note\", StickyNote);\n\n\n//# sourceURL=webpack:///./scripts/main.es6.js?");

/***/ }),

/***/ "./src/StickyNote.js":
/*!***************************!*\
  !*** ./src/StickyNote.js ***!
  \***************************/
/*! exports provided: StickyNote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StickyNote\", function() { return StickyNote; });\nclass StickyNote extends HTMLElement {\n  createdCallback() {\n    this.classList.add(...StickyNote.CLASSES);\n    this.innerHTML = StickyNote.TEMPLATE;\n    this.messageElement = this.querySelector(\".message\");\n    this.dateElement = this.querySelector(\".date\");\n    this.deleteButton = this.querySelector(\".delete\");\n    this.deleteButton.addEventListener(\"click\", () => this.deleteNote());\n  }\n\n  attributeChangedCallback(attributeName) {\n    if (attributeName == \"id\") {\n      let date;\n      if (this.id) {\n        date = new Date(parseInt(this.id));\n      } else {\n        date = new Date();\n      }\n\n      let dateFormatterOptions = { day: \"numeric\", month: \"short\" };\n      let shortDate = new Intl.DateTimeFormat(\n        \"en-US\",\n        dateFormatterOptions\n      ).format(date);\n      this.dateElement.textContent = `Created on ${shortDate}`;\n    }\n  }\n\n  setMessage(message) {\n    this.messageElement.textContent = message;\n    this.messageElement.innerHTML = this.messageElement.innerHTML.replace(\n      /\\n/g,\n      \"<br>\"\n    );\n  }\n\n  deleteNote() {\n    localStorage.removeItem(this.id);\n    this.parentNode.removeChild(this);\n  }\n}\n\n// Initial content of the element.\nStickyNote.TEMPLATE = `<div class=\"message\"></div>\n  <div class=\"date\"></div>\n  <button class=\"delete mdl-button mdl-js-button mdl-js-ripple-effect\">\n  Delete\n  </button>`;\n\n// StickyNote elements top level style classes.\nStickyNote.CLASSES = [\n  \"mdl-cell--4-col-desktop\",\n  \"mdl-card__supporting-text\",\n  \"mdl-cell--12-col\",\n  \"mdl-shadow--2dp\",\n  \"mdl-cell--4-col-tablet\",\n  \"mdl-card\",\n  \"mdl-cell\",\n  \"sticky-note\"\n];\n\nconst StickyNote = StickyNote;\n\n//# sourceURL=webpack:///./src/StickyNote.js?");

/***/ }),

/***/ "./src/StickyNotesApp.js":
/*!*******************************!*\
  !*** ./src/StickyNotesApp.js ***!
  \*******************************/
/*! exports provided: StickyNotesApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StickyNotesApp\", function() { return StickyNotesApp; });\n/* harmony import */ var _StickyNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StickyNote */ \"./src/StickyNote.js\");\n\n\nclass StickyNotesApp {\n  constructor() {\n    this.notesContainer = document.getElementById(\"notes-container\");\n    this.noteMessageInput = document.getElementById(\"message\");\n    this.addNoteButton = document.getElementById(\"save\");\n    this.notesSectionTitle = document.getElementById(\"notes-section-title\");\n\n    this.addNoteButton.addEventListener(\"click\", () => this.saveNote());\n\n    this.noteMessageInput.addEventListener(\"keyup\", () => this.toggleButton());\n\n    for (let key in localStorage) {\n      this.displayNote(key, localStorage[key]);\n    }\n\n    window.addEventListener(\"storage\", e =>\n      this.displayNote(e.key, e.newValue)\n    );\n  }\n\n  saveNote() {\n    if (this.noteMessageInput.value) {\n      let key = Date.now().toString();\n      localStorage.setItem(key, this.noteMessageInput.value);\n      this.displayNote(key, this.noteMessageInput.value);\n      StickyNotesApp.resetMaterialTextfield(this.noteMessageInput);\n      this.toggleButton();\n    }\n  }\n\n  static resetMaterialTextfield(element) {\n    element.value = \"\";\n    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();\n    element.blur();\n  }\n\n  displayNote(key, message) {\n    let note = document.getElementById(key);\n\n    if (!note) {\n      note = document.createElement(\"sticky-note\");\n      note.id = key;\n      this.notesContainer.insertBefore(\n        note,\n        this.notesSectionTitle.nextSibling\n      );\n    }\n\n    if (!message) {\n      return note.deleteNote();\n    }\n    note.setMessage(message);\n  }\n\n  toggleButton() {\n    if (this.noteMessageInput.value) {\n      this.addNoteButton.removeAttribute(\"disabled\");\n    } else {\n      this.addNoteButton.setAttribute(\"disabled\", \"true\");\n    }\n  }\n}\n\nconst StickyNotesApp = StickyNotesApp;\n\n//# sourceURL=webpack:///./src/StickyNotesApp.js?");

/***/ })

/******/ });