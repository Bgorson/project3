import React, {Component} from "react";
import { Stage, Layer, Star, Rect} from 'react-konva';
import Konva from 'konva';


class Images extends Component {
    handleDragStart = e => {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
          scaleX: 1.1,
          scaleY: 1.1
        });
      };
      handleDragEnd = e => {
        e.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
          shadowOffsetX: 5,
          shadowOffsetY: 5
        });
      };
      render() {
        return (
                <Star
                  x={Math.random() * window.innerWidth}
                  y={Math.random() * window.innerHeight}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={35}
                  fill="ffffff"
                  opacity={0.8}
                  draggable
                  rotation={Math.random() * 180}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOpacity={0.6}
                  onDragStart={this.handleDragStart}
                  onDragEnd={this.handleDragEnd}
                />

        );
      }
    }

export default Images;