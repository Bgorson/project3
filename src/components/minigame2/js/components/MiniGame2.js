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
        <div class = "cell1" onClick={this.handleClick} >1</div>
        <div class="cell2" onClick={this.handleClick}>2</div>
        <div class = "cell3" onClick={this.handleClick}>3</div>
        {/* <div class = "cell4" onClick={this.handleClick}>4</div>
        <div class = "cell5" onClick={this.handleClick}>5</div>
        <div class = "cell6" onClick={this.handleClick}>6</div>
        <div class = "cell7" onClick={this.handleClick}>7</div>
        <div class = "cell8" onClick={this.handleClick}>8</div>
        <div class = "cell9" onClick={this.handleClick}>9</div>
        <div class = "cell10" onClick={this.handleClick}>10</div>
        <div class = "cell11" onClick={this.handleClick}>11</div>
        <div class = "cell12" onClick={this.handleClick}>12</div>
        <div class = "cell13" onClick={this.handleClick}>13</div>
        <div class = "cell14" onClick={this.handleClick}>14</div>
        <div class = "cell15" onClick={this.handleClick}>15</div>
        <div id="empty" onClick={this.handleClick}></div> */}
            {/* <div key={i} onClick={this.handleClick}>
              {div}
            </div> */}

      {/* //Each div created for amount in array above//
        {cells.map((cell, i) => {
          return (
            //Click event for each div//
            <div key={i} onClick={this.handleClick}>
              {cell}
            </div>
          );
        })} */} 
        </div>
    );
  }
}

export default MiniGame2;
