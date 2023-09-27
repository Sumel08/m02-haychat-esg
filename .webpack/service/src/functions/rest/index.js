/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chatbots/common.js":
/*!********************************!*\
  !*** ./src/chatbots/common.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CommonChatbot: () => (/* binding */ CommonChatbot)\n/* harmony export */ });\nconst CommonChatbot = class {\n  processMessage(message) {\n    throw new Error(\"Imlement this method\");\n  }\n  #buildBaseMessage() {\n    return {\n      author: \"echo@haystack.com\",\n      id: \"bdb86635-7774-4bb8-a64b-c393ea743ce2\",\n      read: 1,\n      readBy: \"\",\n      sendingMessage: false,\n      sentBy: process.env.service,\n      source: \"haystack-dot\",\n      text: {\n        body: \"Echo: ahora quiero el echo de tu voz\"\n      },\n      timestamp: new Date().getTime(),\n      type: \"text\"\n    };\n  }\n  buildTextMessage(text) {\n    const message = this.#buildBaseMessage();\n    message.type = \"text\";\n    message.text = {\n      body: text\n    };\n    return message;\n  }\n};\n\n//# sourceURL=webpack://m02-haychat-esg/./src/chatbots/common.js?");

/***/ }),

/***/ "./src/chatbots/echoBot.js":
/*!*********************************!*\
  !*** ./src/chatbots/echoBot.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EchoBot: () => (/* binding */ EchoBot)\n/* harmony export */ });\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/chatbots/common.js\");\n\nconst EchoBot = class extends _common__WEBPACK_IMPORTED_MODULE_0__.CommonChatbot {\n  processMessage(message) {\n    return this.buildTextMessage(`Echo: ${message}`);\n  }\n};\n\n//# sourceURL=webpack://m02-haychat-esg/./src/chatbots/echoBot.js?");

/***/ }),

/***/ "./src/chatbots/factory.js":
/*!*********************************!*\
  !*** ./src/chatbots/factory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatbotFactory: () => (/* binding */ ChatbotFactory)\n/* harmony export */ });\n/* harmony import */ var _echoBot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./echoBot */ \"./src/chatbots/echoBot.js\");\n\nconst ChatbotFactory = class {\n  static getChatbot() {\n    return new _echoBot__WEBPACK_IMPORTED_MODULE_0__.EchoBot();\n  }\n};\n\n//# sourceURL=webpack://m02-haychat-esg/./src/chatbots/factory.js?");

/***/ }),

/***/ "./src/functions/rest/index.js":
/*!*************************************!*\
  !*** ./src/functions/rest/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handle: () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes */ \"./src/functions/rest/routes.js\");\n\nconst api = __webpack_require__(/*! lambda-api */ \"lambda-api\")();\napi.use((req, res, next) => {\n  res.cors();\n  next();\n});\napi.post('/esg/haychat/webhook', _routes__WEBPACK_IMPORTED_MODULE_0__.notificationHandler);\nconst handle = async (event, context) => {\n  api.app({});\n  return api.run(event, context);\n};\n\n//# sourceURL=webpack://m02-haychat-esg/./src/functions/rest/index.js?");

/***/ }),

/***/ "./src/functions/rest/routes.js":
/*!**************************************!*\
  !*** ./src/functions/rest/routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   notificationHandler: () => (/* binding */ notificationHandler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chatbots_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chatbots/factory */ \"./src/chatbots/factory.js\");\n\n\nconst notificationHandler = async (req, res) => {\n  const {\n    conversationId,\n    userId,\n    message\n  } = req.body;\n  const chatbot = _chatbots_factory__WEBPACK_IMPORTED_MODULE_1__.ChatbotFactory.getChatbot();\n  try {\n    const messageResponse = chatbot.processMessage(message.text.body);\n    const response = {\n      conversationId,\n      userId,\n      message: messageResponse\n    };\n    // return res.status(201).json(response);\n    await axios__WEBPACK_IMPORTED_MODULE_0___default().post(\"https://us-central1-haystack-dot.cloudfunctions.net/chatWebhook\", response);\n  } catch (error) {\n    return res.status(400).json({\n      message: \"something went wrong\"\n    });\n  }\n  return res.status(201).json({\n    message: \"ok\"\n  });\n};\n\n//# sourceURL=webpack://m02-haychat-esg/./src/functions/rest/routes.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "lambda-api":
/*!*****************************!*\
  !*** external "lambda-api" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lambda-api");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("regenerator-runtime/runtime");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("regenerator-runtime/runtime");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/rest/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;