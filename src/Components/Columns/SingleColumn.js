import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import Card from '../Card';

const Column = styled.div`
  width: 110px;
  padding: 0 5px;
  height: 500px;
  position: relative;
  margin-right: 15px;
`;

const ColumnFrame = styled.div`
  width: 109px;
  height: 152px;
  background: lightgray;
  border-radius: 5px;
  position: absolute;
  top: 0;
  z-index: -1;
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

// const renderCards = column => {
//     return column.map((card, index) => {
//       return <Card index={index} key={card.id} card={card} />
//     })
// }

class SingleColumn extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    const { column, index } = this.props;
    if (column !== prevProps.column) {
      this.renderCards(column, index)
    }
  }
  renderCards = (column, parentIndex) => {
    return column.map((card, index) => {
      return <Card index={index} parentIndex={parentIndex} key={card.id} card={card} />
    })
  }
  render() {
    const { connectDropTarget, column, index } = this.props;

    return connectDropTarget(
    //   <div className="target" style={{ background: backgroundColor }}>
    //     <div className="item-container">
    //       {this.state.items.map(item => (
    //         <Item key={item.id} item={item} />
    //       ))}
    //     </div>
    //   </div>
      <div>
        <Column index={index}>
          {this.renderCards(column, index)}
          <ColumnFrame />
        </Column>
      </div>
    );
  }
}

export default DropTarget('item', itemSource, collect)(SingleColumn);
