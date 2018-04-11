import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import App from "./App";

// Styles
import "./index.css";

// Service Worker
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
// Initialize service worker
registerServiceWorker();
