import React, {Component} from "react";
import { Stage, Layer} from 'react-konva';


// import "./style.css"
import Images from './Images'

class MiniGame4 extends Component {
    
      render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  <Images />
                  <Images />
                  <Images />
                  <Images />
                  <Images />
                </Layer>
          </Stage>
        );
      }
    }

export default MiniGame4;