import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { initialState } from "./contents/InitialState";
import { StateProvider } from "./contents/StateProvider";
import reducer from './contents/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById("root")
);
