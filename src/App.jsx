import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Group from "./Group";
import initialData from "./initial-data";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #fff;
`;

export default class App extends Component {
  state = initialData;

  onDragStart = start => {
    const { groupOrder } = this.state;
    const { droppableId } = start.source;
    console.log("drag started:", start);
    const startIndex = groupOrder.indexOf(droppableId);

    this.setState({
      startIndex
    });
  };

  onDragUpdate = update => {
    console.log("drag updated:", update);
  };

  onDragEnd = ({ destination, source, draggableId, type }) => {
    this.setState({
      startIndex: null
    });

    // invalid drop
    if (!destination) {
      console.log("invalid drop destination:", destination);
      return;
    }

    // dropped back in place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("dropped back in place");
      return;
    }

    if (type === "column") {
      const newGroupOrder = Array.from(this.state.groupOrder);
      newGroupOrder.splice(source.index, 1);
      newGroupOrder.splice(destination.index, 0, draggableId);

      this.setState({ groupOrder: newGroupOrder });
      return;
    }

    // dropped back in the same droppable
    if (destination.droppableId === source.droppableId) {
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
    const { groups, tasks, groupOrder, startIndex } = state;

    return (
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {groupOrder.map((groupId, index) => {
                const group = groups[groupId];
                const groupTasks = group.taskIds.map(taskId => tasks[taskId]);

                index < startIndex &&
                  console.log("can't move back, drop disabled");
                const isDropDisabled = index < startIndex;

                return (
                  <Group
                    key={group.id}
                    group={group}
                    tasks={groupTasks}
                    isDropDisabled={isDropDisabled}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
