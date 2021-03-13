import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import Card from '../Card';

const Foundation = styled.div`
  width: 110px;
  padding: 0 5px;
  position: relative;
  margin-right: 15px;
`;

const FoundationFrame = styled.div`
  width: 109px;
  height: 152px;
  background: lightgray;
  border-radius: 5px;
  position: relative;
  > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const itemSource = {
  drop(props, monitor) {
    const dragProps = monitor.getItem();
    return props.onDrop(dragProps, props.index);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class SingleFoundation extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    const { column, index } = this.props;
    if (column !== prevProps.column) {
      this.renderCards(column, index)
    }
  }
  renderCards = (foundation, parentIndex) => {
    return foundation.map(card => {
      return <Card isFromFoundation={true} parentIndex={parentIndex} key={card.id} card={card} />
    })
  }
  render() {
    const { connectDropTarget, foundation, index } = this.props;

    return connectDropTarget(
      <div>
        <Foundation index={index}>
          <FoundationFrame>
            {this.renderCards(foundation, index)}
          </FoundationFrame>
        </Foundation>
      </div>
    );
  }
}

export default DropTarget('item', itemSource, collect)(SingleFoundation);
