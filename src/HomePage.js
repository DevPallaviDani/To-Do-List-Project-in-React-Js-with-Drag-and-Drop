import React, { useState, useEffect } from "react";
import { TaskList } from "./Components/TaskList";
import { Box } from "@mui/material";
import TaskModel from "./Models/TaskModel";
import UseIdGenerate from "./CustomeHook/UseIdGenerate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

export const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, seteditedTasks] = useState([]);
  const taskId = UseIdGenerate("task");
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);

  //Filtered tasks by Status
  const unStartedTasks = tasks.filter((task) => task.status === "ToDo's");
  const inProgessTasks = tasks.filter((task) => task.status === "InProgress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  // add new task
  const addTask = (task, descp, selectedAssignees, selectedStatus) => {
    const newTasks = new TaskModel(
      uuidv4(),
      //String(taskId()),
      task,
      descp,
      selectedStatus,
      selectedAssignees
    );
    setTasks([...tasks, newTasks]);
  };
  // update edited task
  const updatedTask = (editedTasks) => {
    if (editedTasks) {
      const updatedTask = tasks.map((task) =>
        task.id === editedTasks.id
          ? {
              ...task,
              title: editedTasks.title,
              descp: editedTasks.descp,
              status: editedTasks.status,
              assignees: editedTasks.assignees,
              index: editedTasks.index,
            }
          : task
      );
      setTasks(updatedTask);
      seteditedTasks(null);
      console.log(editedTasks);
    }
  };

  // set and get Local storage data
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  //drag and drop

  const onDragEnd = (result) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add = null;
    let todoTask = unStartedTasks;
    let inProgress = inProgessTasks;
    let complete = completedTasks;

    console.log("source droppableId ", source.droppableId);
    console.log("source index ", source.index);
    console.log("destination droppableId ", destination.droppableId);
    console.log("destination index ", destination.index);

    switch (source.droppableId) {
      case "ToDo's":
        add = todoTask[source.index];
        todoTask.splice(source.index, 1);
        break;
      case "InProgress":
        add = inProgress[source.index];
        inProgress.splice(source.index, 1);
        break;
      case "Completed":
        add = complete[source.index];
        complete.splice(source.index, 1);
        break;
      default:
        break;
    }

    // Destination Logic
    if (add) {
      switch (destination.droppableId) {
        case "ToDo's":
          todoTask.splice(destination.index, 0, add);
          todoTask = tasks.map((task) =>
            task.id === add.id
              ? {
                  ...task,
                  status: destination.droppableId,
                }
              : task
          );
          console.log("todoTask ", todoTask);
          setTasks(todoTask);
          break;
        case "InProgress":
          inProgress.splice(destination.index, 0, add);
          inProgress = tasks.map((task) =>
            task.id === add.id
              ? {
                  ...task,
                  status: destination.droppableId,
                }
              : task
          );
          console.log("inProgress ", inProgress);
          setTasks(inProgress);
          break;
        case "Completed":
          complete.splice(destination.index, 0, add);
          complete = tasks.map((task) =>
            task.id === add.id
              ? {
                  ...task,
                  status: destination.droppableId,
                }
              : task
          );
          console.log("complete ", complete);
          setTasks(complete);
          break;
        default:
          break;
      }
    }

    console.log(todoTask, add);
  };

  return (
    <div>
      <Box className="box-page">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <TaskList tasks={tasks} updatedTask={updatedTask} addTask={addTask} />
        </DragDropContext>
      </Box>
    </div>
  );
};
