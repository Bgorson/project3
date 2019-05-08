import React, { Component } from 'react';
import "../../css/stylesheet.css";
import { Motion, spring } from "react-motion";


const cells= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 0];

const array = [
  [1,2,3,4],
  [5,6,7,8],
  [9,'',11,12],
  [13,14,15,10]
]; // Keep track of empty cell by using the 'state'


class MiniGame2 extends Component {
  state = {
    
  }

 handleClick = () => {
   console.log("click")
 }

  render() {
    return (
      <div className= "container">
        {
          cells.map( (cell, i) => {
            return (<div key= {i} onClick= {this.handleClick}>{cell}</div>)
          })
        }
      </div>
    )
  }
}

export default MiniGame2;
