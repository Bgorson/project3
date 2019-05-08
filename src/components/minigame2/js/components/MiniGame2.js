import React, { Component } from "react";
import "../../css/stylesheet.css";
import { Motion, spring } from "react-motion";

//Individual cells//
const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

class MiniGame2 extends Component {
  state = {};

  handleClick = () => {
    console.log("click");
  };

  render() {
    return (
      //Puzzle container//
      <div className="puzzle">
      {/* //Each div created for amount in array above// */}
        {cells.map((cell, i) => {
          return (
            //Click event for each div//
            <div key={i} onClick={this.handleClick}>
              {cell}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MiniGame2;
