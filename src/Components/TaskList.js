import React, { useState } from "react";
import { Stack, Button, IconButton, styled, Grid, Chip } from "@mui/material";

import { green, purple, orange, grey } from "@mui/material/colors";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CustomTaskList from "./CustomTaskList";
import { TaskDetailsPopUp } from "./TaskDetailsPopUp";
import { Droppable } from "react-beautiful-dnd";

export const TaskList = ({ tasks, updatedTask, addTask }) => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditTaskOpen = (task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
    setIsEditMode(true);
  };
  const handleAddTaskOpen = () => {
    setIsDialogOpen(true);
    setIsEditMode(false);
    setTaskToEdit(null);
  };
  const handleClickOpen = (task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
    setIsEditMode(false);
    console.log(task);
  };
  const handleClickClose = () => {
    setTaskToEdit(null);
    setIsDialogOpen(false);
  };
  const handleDeleteAllTask = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleDeleteTask = () => {};
  //Filtered Status
  const unStartedTasks = tasks.filter((task) => task.status === "ToDo's");
  const inProgessTasks = tasks.filter((task) => task.status === "InProgress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  if (tasks) {
    return (
      <div>
        <Grid container spacing={2} className="grid-container">
          <Grid item>
            <IconButton aria-label="addNewTask" className="add-task-button">
              <Chip
                icon={
                  <AddTaskRoundedIcon
                    color="success"
                    onClick={handleAddTaskOpen}
                  />
                }
                label="Add New Task"
              />
            </IconButton>
            <IconButton
              aria-label="deleteAllTasks"
              className="delete-all-task-button"
            >
              <Chip
                icon={
                  <DeleteRoundedIcon
                    color="error"
                    onClick={handleDeleteAllTask}
                  />
                }
                label="Delete All Tasks"
              />
            </IconButton>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 3 }}
          useFlexGap
          className="task-list-container"
        >
          <Droppable droppableId="ToDo's">
            {(provided, snapshot) => (
              <div
                className={`tasks ${
                  snapshot.isDraggingOver ? "dragactive" : "dragcomplete"
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CustomTaskList
                  tasks={unStartedTasks}
                  iconColor={green[500]}
                  onClick={handleEditTaskOpen}
                  listTitle={"ToDo's"}
                  listSubtitle={"  This item hasn't been started"}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="InProgress">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`tasks ${
                  snapshot.isDraggingOver ? "dragactive" : "dragcomplete"
                }`}
              >
                <CustomTaskList
                  tasks={inProgessTasks}
                  iconColor={orange[500]}
                  onClick={handleEditTaskOpen}
                  listTitle={"InProgress"}
                  listSubtitle={"    This is actively being worked on"}
                />

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Completed">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`tasks ${
                  snapshot.isDraggingOver ? "dragactive" : "dragcomplete"
                }`}
              >
                <CustomTaskList
                  tasks={completedTasks}
                  iconColor={purple[500]}
                  onClick={handleEditTaskOpen}
                  listTitle={"Completed"}
                  listSubtitle={"    This has been completed"}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Stack>

        <div>
          <TaskDetailsPopUp
            isOpen={isDialogOpen}
            onClose={handleClickClose}
            isEditMode={isEditMode}
            taskToEdit={taskToEdit}
            addTask={addTask}
            onEditTaskSubmit={updatedTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
