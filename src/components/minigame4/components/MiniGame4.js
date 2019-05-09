import React, {Component} from "react";
import { Stage, Layer, Rect} from 'react-konva';

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
                <Layer>
                  <Rect
                  fill="#FFFFFF"
                  width="100px"
                  height="100px"
                  >
                  </Rect>
                </Layer>
          </Stage>
        );
      }
    }

export default MiniGame4;