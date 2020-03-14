import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import Group from "./Group";
import initialData from "./initial-data";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default class App extends Component {
  state = initialData;

  // onDragStart = start => {
  //   console.log("drag started:", start);
  // };

  // onDragUpdate = update => {
  //   console.log("drag updated:", update);
  // };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // invalid drop
    if (!destination) {
      console.log("invalid drop destination:", destination);
      return;
    }

    // dropped in the same column
    if (destination.droppableId === source.droppableId) {

      // dropped back in place
      if (destination.index === source.index) {
        console.log("dropped back in place");
        return;
      }

      // get draggable's group
      const group = this.state.groups[source.droppableId];

      const newTaskIds = Array.from(group.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      this.setState(({ groups }) => ({
        groups: {
          ...groups,
          [group.id]: {
            ...group,
            taskIds: newTaskIds
          }
        }
      }));

      return;
    }

    // dropped in different column
    const { groups } = this.state;
    const start = groups[source.droppableId];
    const finish = groups[destination.droppableId];

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    this.setState(({ groups }) => ({
      groups: {
        ...groups,
        [start.id]: {
          ...start,
          taskIds: startTaskIds
        },
        [finish.id]: {
          ...finish,
          taskIds: finishTaskIds
        }
      }
    }));
  };

  render() {
    const { onDragStart, onDragUpdate, onDragEnd, state } = this;
    const { groups, tasks, groupOrder } = state;

    return (
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Container>
          {groupOrder.map(groupId => {
            const group = groups[groupId];
            const groupTasks = group.taskIds.map(taskId => tasks[taskId]);

            return <Group key={group.id} group={group} tasks={groupTasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}
