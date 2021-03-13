import React, { useContext } from 'react';
import { store } from '../../Store';
import styled from 'styled-components';
import SingleFoundation from './SingleFoundation';

const Wrapper = styled.div`
  display: flex;
  margin: 15px 0 15px 5px;
`;

const Foundations = () => {
  const { state, dispatch } = useContext(store);

  const onDrop = (dragProps, targetIndex) => {
    const dropTarget = state.foundations[targetIndex];
    const dropTargetCard = dropTarget[dropTarget.length - 1];
    const dragCard = dragProps.card;

    let checkResult;
    if ( dropTargetCard !== undefined) {
      checkResult = checkIsMovable(dragCard, dropTargetCard);
    } else if ( dropTargetCard === undefined && dragCard.number === 1 ) {
      checkResult = true;
    } else {
      checkResult = false
    }

    if (!checkResult) return;

    const isMoveFromStock = dragProps.parentIndex === undefined;

    if (isMoveFromStock) {
      const newData = createNewStockAndFoundations(dragCard, targetIndex);
      dispatch({ type: "MOVE_STOCK_TO_FOUNDATION", payload: newData });
    } else {
      const newData = createNewColumnsAndFoundations(dragCard, dragProps.parentIndex, targetIndex);
      dispatch({ type: "MOVE_COLUMN_TO_FOUNDATION", payload: newData });
    }
  }

  const createNewColumnsAndFoundations = (dragCard, fromIndex, toIndex) => {
    let newColumns = state.columns.map(column => {
      return column.slice();
    });
    let newFoundations = state.foundations.map(foundation => {
      return foundation.slice();
    });
    let fromColumn = newColumns[fromIndex];
    let toFoundation = newFoundations[toIndex];

    const dragCardIndex = fromColumn.findIndex(card => card.id === dragCard.id);
    fromColumn.splice(dragCardIndex);

    const isRequiredOpen = fromColumn.length > 0 && fromColumn.every(card => card.face === false);
    if ( isRequiredOpen ) {
      fromColumn[fromColumn.length - 1]['face'] = true;
    }

    toFoundation = [...toFoundation, dragCard];
    newColumns[fromIndex] = fromColumn;
    newFoundations[toIndex] = toFoundation;

    return { newColumns, newFoundations };
  }

  const createNewStockAndFoundations = (dragCard, toIndex) => {
    let newFoundations = state.foundations.map(foundation => {
      return foundation.slice();
    });
    let toFoundation = newFoundations[toIndex];
    toFoundation = [...toFoundation, dragCard];
    newFoundations[toIndex] = toFoundation;

    let newOpenedStocks = state.openedStock.slice();
    const dragCardIndex = newOpenedStocks.findIndex(card => card.id === dragCard.id);
    newOpenedStocks.splice(dragCardIndex);

    return { newOpenedStocks, newFoundations };
  }

  const checkIsMovable = (dragCard, dropTargetCard) => {
    const acceptNumber = dropTargetCard.number + 1;
    
    const isValidNumber = dragCard.number === acceptNumber;
    const isValidPatten = dragCard.pattern === dropTargetCard.pattern;
    return isValidNumber && isValidPatten;
  }

  const renderFoundations = () => {    
    return state.foundations.map((foundation, index) => {
      return <SingleFoundation index={index} key={index} foundation={foundation} onDrop={onDrop} />
    })
  }

  return (
    <Wrapper>
      {renderFoundations()}
    </Wrapper>
  )
};

export default Foundations;
