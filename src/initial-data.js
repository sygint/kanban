const initialData = {
  tasks: {
    task1: { id: "task1", content: "Take out the garbage" },
    task2: { id: "task2", content: "Watch my favorite show" },
    task3: { id: "task3", content: "Charge my phone" },
    task4: { id: "task4", content: "Cook dinner" },
    task5: { id: "task5", content: "Buy groceries" },
    task6: { id: "task6", content: "Watch a movie" },
    task7: { id: "task7", content: "Exercise" },
    task8: { id: "task8", content: "Do taxes" },
    task9: { id: "task9", content: "Cook dinner" },
    task10: { id: "task10", content: "Clean house" },
    task11: { id: "task11", content: "Wash car" },
    task12: { id: "task12", content: "Walk dog" }
  },
  groups: {
    group1: {
      id: "group1",
      title: "To Do",
      taskIds: [
        "task1",
        "task2",
        "task3",
        "task4",
        "task5",
        "task6",
        "task7",
        "task8",
        "task9",
        "task10",
        "task11",
        "task12"
      ]
    },
    group2: {
      id: "group2",
      title: "In progress",
      taskIds: []
    },
    group3: {
      id: "group3",
      title: "Done",
      taskIds: []
    }
  },
  groupOrder: ["group1", "group2", "group3"]
};

export default initialData;
