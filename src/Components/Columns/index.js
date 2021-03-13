import React, { useContext } from 'react';
import { store } from '../../Store';
import styled from 'styled-components';
import SingleColumn from './SingleColumn';

const Wrapper = styled.div`
  display: flex;
`;

const Columns = () => {
  const { state, dispatch } = useContext(store);

  const onDrop = (dragProps, targetIndex) => {
    const dropTarget = state.columns[targetIndex];
    const dropTargetCard = dropTarget[dropTarget.length - 1];
    const dragCard = dragProps.card;

    let checkResult;
    if ( dropTargetCard !== undefined) {
      checkResult = checkIsMovable(dragCard, dropTargetCard);
    } else if ( dropTargetCard === undefined && dragCard.number === 13 ) {
      checkResult = true;
    } else {
      checkResult = false
    }

    if (!checkResult) return;

    const isMoveFromStock = dragProps.parentIndex === undefined;
    const isMoveFromFoundation = dragProps.isFromFoundation;

    if (isMoveFromStock) {
      const newData = createNewStockAndColumns(dragCard, targetIndex);
      dispatch({ type: "MOVE_STOCK_TO_COLUMN", payload: newData });
    } else if (isMoveFromFoundation) {
      const newData = createNewColumnsAndFoundations(dragCard, dragProps.parentIndex, targetIndex);
      dispatch({ type: "MOVE_FOUNDATION_TO_COLUMN", payload: newData });
    } else {
      const newData = createNewColumns(dragCard, dragProps.parentIndex, targetIndex);
      dispatch({ type: "MOVE_COLUMN_TO_COLUMN", payload: newData });
    }
  }

  const createNewColumns = (dragCard, fromIndex, toIndex) => {
    let newColumns = state.columns.map(column => {
      return column.slice();
    });
    let fromColumn = newColumns[fromIndex];
    let toColumn = newColumns[toIndex];

    const dragCardIndex = fromColumn.findIndex(card => card.id === dragCard.id);
    const allDragCards = fromColumn.splice(dragCardIndex);

    const isRequiredOpen = fromColumn.length > 0 && fromColumn.every(card => card.face === false);
    if ( isRequiredOpen ) {
      fromColumn[fromColumn.length - 1]['face'] = true;
    }

    toColumn = [...toColumn, ...allDragCards];
    newColumns[fromIndex] = fromColumn;
    newColumns[toIndex] = toColumn;

    return newColumns;
  }

  const createNewStockAndColumns = (dragCard, toIndex) => {
    let newColumns = state.columns.map(column => {
      return column.slice();
    });
    let toColumn = newColumns[toIndex];
    toColumn = [...toColumn, dragCard];
    newColumns[toIndex] = toColumn;

    let newOpenedStocks = state.openedStock.slice();
    const dragCardIndex = newOpenedStocks.findIndex(card => card.id === dragCard.id);
    newOpenedStocks.splice(dragCardIndex);

    return { newOpenedStocks, newColumns };
  }

  const createNewColumnsAndFoundations = (dragCard, fromIndex, toIndex) => {
    let newColumns = state.columns.map(column => {
      return column.slice();
    });
    let newFoundations = state.foundations.map(foundation => {
      return foundation.slice();
    });
    let fromFoundation = newFoundations[fromIndex];
    let toColumn = newColumns[toIndex];

    const dragCardIndex = fromFoundation.findIndex(card => card.id === dragCard.id);
    fromFoundation.splice(dragCardIndex);

    toColumn = [...toColumn, dragCard];
    newColumns[toIndex] = toColumn;
    newFoundations[fromIndex] = fromFoundation;

    return { newColumns, newFoundations };
  }

  const checkIsMovable = (dragCard, dropTargetCard) => {
    const acceptNumber = dropTargetCard.number - 1;
    const acceptPatterns = dropTargetCard.pattern <= 1 ? [2, 3] : [0, 1];
    
    const isValidNumber = dragCard.number === acceptNumber;
    const isValidPatten = acceptPatterns.findIndex(pattern => pattern === dragCard.pattern) !== -1;
    return isValidNumber && isValidPatten;
  }

  const renderColumns = () => {
    return state.columns.map((column, index) => {
      return <SingleColumn index={index} key={index} column={column} onDrop={onDrop} />
    })
  }

  return (
    <Wrapper>
      {renderColumns()}
    </Wrapper>
  )
};

export default Columns;
