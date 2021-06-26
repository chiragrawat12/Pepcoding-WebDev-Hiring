import React, { Component } from "react";
import "./Components.css";
import Calender from "./Calender";

export default class Content extends Component {

  render() {
    return (
      <div id = "body">
        <div className="display-month-year"><p></p></div>
          <div id = "calender-nav">
            <button id = "expand">Expand</button>
            <div className="change-nav">
              <button id = "prev">Prev</button>
              <button id = "next">Next</button>
            </div>
          </div>
          <div id="calender-box">
            <Calender />
          </div>
      </div>
    );
  }
}
