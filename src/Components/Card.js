import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import styled, { css } from 'styled-components';

const CardImage = styled.img`
  width: 110px;

  ${props => props.index ? css`
    position: absolute;
    top: ${(props) => props.index * 25}px;
    z-index: 2;
  ` : ''}
`;

const itemSource = {
  beginDrag(props) {
    return {
      card: props.card,
      parentIndex: props.parentIndex,
      isFromFoundation: props.isFromFoundation
    };
  },
  canDrag(props) {
    if(!props.card.face) {
      return false
    } else {
      return true
    }
  }
  // isDragging(monitor) {},
  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  // }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Card extends Component {
  render() {
    const { isDragging, connectDragSource, card, index } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      card.face ? (
        <div style={{ opacity }}><CardImage index={index} src={`${process.env.PUBLIC_URL}/${card.pattern}/${card.number}.png`} /></div>
      ) : (
        <div><CardImage index={index} src={`${process.env.PUBLIC_URL}/cardFace.png`} /></div>
      )
    );
  }
}

export default DragSource('item', itemSource, collect)(Card);
