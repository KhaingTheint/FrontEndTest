import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SideBar from "./components/SideBar";
import * as serviceWorker from "./serviceWorker";

// set the side navigation bar
ReactDOM.render(<SideBar />, document.getElementById("root"));

serviceWorker.unregister();
