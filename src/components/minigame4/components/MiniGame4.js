import React, {Component} from "react";
import { Stage, Layer, Rect} from 'react-konva';

import Images from './Images'

class MiniGame4 extends Component {
    
      render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                            <Layer>
                  <Rect
                  fill="#FFFFFF"
                  width={100}
                  height={100}
                  x={20}
                  y={20}
                  >
                  </Rect>
                </Layer>
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