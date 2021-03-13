import React, { createContext, useReducer } from 'react';

const initialState = {
  count: 0,
  columns: [],
  stock: [],
  openedStock: [],
  foundations: [
    [],[],[],[]
  ],
  score: 0,
  moveHisotry: {
    dragCard: {},
    fromIndex: 0,
    toIndex: 0
  }
};

const init = () => {
  const cardData = createCardData();
  const shuffledCardData = shuffleCardData(cardData);
  setCardData(shuffledCardData);
};

const createCardData = () => {
  let array = [];
  for (let i = 0; i < 4; i++ ) {
    for (let n = 0; n < 13; n++ ) {
      array.push(
        {
          id: `${i}-${n + 1}`,
          number: n + 1,
          pattern: i,
          face: false
        }
      )
    }
  }
  return array;
}

const shuffleCardData = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const setCardData = ([...array]) => {
  let columns = [];
  for (let i = 0; i < 7; i++) {
    columns.push([]);
    for (let n = 0; n < i + 1; n++) {
      columns[i].push(array.pop())
    }
  }
  initialState.columns = enableLastColumn(columns);
  initialState.stock = enableStockCard(array);
}

const enableLastColumn = ([...columns]) => {
  return columns.map(column => {
    column[column.length - 1]['face'] = true;
    return column;
  });
}

const enableStockCard = ([...array]) => {
  return array.map(card => {
    card['face'] = true;
    return card;
  });
}

init();

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'OPEN_STOCK': {
        return { ...state, openedStock: action.payload }
      }
      case 'RESET_STOCK': {
        return { ...state, stock: action.payload }
      }
      case 'MOVE_COLUMN_TO_COLUMN': {
        return { ...state, columns: action.payload }
      }
      case 'MOVE_COLUMN_TO_FOUNDATION': {
        return {
          ...state,
          columns: action.payload.newColumns,
          foundations: action.payload.newFoundations
        }
      }
      case 'MOVE_STOCK_TO_COLUMN': {
        return {
          ...state,
          columns: action.payload.newColumns,
          openedStock: action.payload.newOpenedStocks
        }
      }
      case 'MOVE_STOCK_TO_FOUNDATION': {
        return {
          ...state,
          openedStock: action.payload.newOpenedStocks,
          foundations: action.payload.newFoundations
        }
      }
      case 'MOVE_FOUNDATION_TO_COLUMN': {
        return {
          ...state,
          columns: action.payload.newColumns,
          foundations: action.payload.newFoundations
        }
      }
      case 'DECREMENT_COUNT': {
        return { ...state, count: state.count - 1 }
      }
      default:
        throw new Error();
      };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
