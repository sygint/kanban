import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  min-height: 20px; /* ensure droppable area for empty list */
  padding: 8px;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background: ${({isDraggingOver}) => isDraggingOver ? 'skyblue' : 'white'};
`;

export default function Group({ group, tasks }) {
  const { title, id } = group;

  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, {isDraggingOver}) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={isDraggingOver}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
