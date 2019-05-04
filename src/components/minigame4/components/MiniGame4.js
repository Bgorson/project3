import React, {Component} from "react";
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

// import "./style.css"

class MiniGame4 extends Component {
    state = {
        color: 'green'
      };
      handleClick = () => {
        this.setState({
          color: Konva.Util.getRandomColor()
        });
      };
      render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                <Text text="Try click on rect" />
                <Rect
                x={20}
                y={20}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
                />
                <Rect
                x={20}
                y={20}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                x={100}
                onClick={this.handleClick}
                />
                </Layer>
          </Stage>
        );
      }
    }

export default MiniGame4;