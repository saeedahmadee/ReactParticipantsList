import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./App";

// Styles
import "./index.scss";

// Service Worker
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
// Initialize service worker
registerServiceWorker();
