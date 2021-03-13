import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import styled from 'styled-components';
import Stocks from './Components/Stocks';
import Foundations from './Components/Foundations';
import Columns from './Components/Columns';

const Wrapper = styled.div``;

const UpperArea = styled.div`
  width: 945px;
  display: flex;
  justify-content: space-between;
`;

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <UpperArea>
          <Stocks />
          <Foundations />
        </UpperArea>
        <Columns />
      </Wrapper>
    </DndProvider>
  )
};

export default App;
