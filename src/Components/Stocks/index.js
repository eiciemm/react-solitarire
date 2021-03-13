import React, { useContext } from 'react';
import { store } from '../../Store';
import styled from 'styled-components';
import Card from '../Card';

const Wrapper = styled.div`
  display: flex;
  margin: 15px 0 15px 5px;
`;

const StockPile = styled.img`
  width: 110px;
`;

const OpenedStocks = styled.div`
  width: 110px;
  position: relative;
  > div {
    position: absolute;
    top: 0;
    left: 25px;
  }
`;

const Stocks = () => {
  const { state, dispatch } = useContext(store);

  const openStockPile = () => {
    const card = state.stock.shift();
    if (card === undefined) {
      dispatch({ type: "RESET_STOCK", payload: state.openedStock });
      dispatch({ type: "OPEN_STOCK", payload: [] });
    } else {
      const newOpenedStock = state.openedStock.slice();
      const payload = [...newOpenedStock, card];

      dispatch({ type: "OPEN_STOCK", payload });
    }
  }

  const renderOpendStocks = () => {
    return state.openedStock.map(stock => {
      return <Card key={stock.id} card={stock} />
    })
  }

  const stockPileImage = state.stock.length > 0 ? 'cardFace' : 'reload';

  return (
    <Wrapper>
      <StockPile
        src={`${process.env.PUBLIC_URL}/${stockPileImage}.png`}
        onClick={openStockPile}
      />
      {state.openedStock.length > 0 && (
        <OpenedStocks>{renderOpendStocks()}</OpenedStocks>
      )}
    </Wrapper>
  )
};

export default Stocks;
