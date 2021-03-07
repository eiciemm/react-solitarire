import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import styled from 'styled-components';
import Columns from './Components/Columns';
import Stocks from './Components/Stocks';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Stocks />
        <Columns />
      </Wrapper>
    </DndProvider>
  )
};

export default App;
