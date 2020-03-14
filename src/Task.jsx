import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: ${({ isDragging }) => isDragging ? 'lightgreen' : 'white'};
  /* display: flex;
  align-items: center; */
`;

// const Handle = styled.div`
//   width: 10px;
//   height: 10px;
//   padding: 5px;
//   margin-right: 10px;
//   background: orange;
//   border-radius: 4px;
// `;

export default function Task({ task, index }) {
  const { id, content } = task;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, {isDragging}) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={isDragging}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {content}
        </Container>
      )}
    </Draggable>
  );
}
