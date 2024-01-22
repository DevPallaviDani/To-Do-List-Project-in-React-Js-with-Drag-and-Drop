import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import useIdGenerate from "../CustomeHook/UseIdGenerate";
import { TaskForm } from "./TaskForm";

export const TaskDetailsPopUp = ({
  isOpen,
  onClose,
  isEditMode,
  taskToEdit,
  addTask,
  onEditTaskSubmit,
}) => {
  const [task, setTask] = useState("");
  const [descp, setDescp] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [status, setStatus] = useState("");
  const taskId = useIdGenerate("task");

  //handle taskStatus
  useEffect(() => {
    if (taskToEdit) {
      setStatus(taskToEdit.status);
      setTask(taskToEdit.title);
      setDescp(taskToEdit.descp);
      setAssignees(taskToEdit.assignees);
    } else {
      taskId();
      setStatus("ToDo's");
      setTask("");
      setDescp("");
      setAssignees([]);
    }
  }, [taskToEdit]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" bgcolor={grey[200]}>
          <div className="dialog-div">
            <span>{isEditMode ? "Edit Task" : "Add New Task"}</span>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="dialog-description">
            <TaskForm
              addTask={addTask}
              isEditMode={isEditMode}
              taskToEdit={taskToEdit}
              onEditTaskSubmit={onEditTaskSubmit}
              onClose={onClose}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
