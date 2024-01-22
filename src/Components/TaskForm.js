import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Divider,
  FormControl,
  Container,
  Autocomplete,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import useIdGenerate from "../CustomeHook/UseIdGenerate";

export const TaskForm = ({
  addTask,
  isEditMode,
  taskToEdit,
  onEditTaskSubmit,
  onClose,
  onDeleteTask,
}) => {
  const [task, setTask] = useState("");
  const [descp, setDescp] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [status, setStatus] = useState("");
  const taskId = useIdGenerate("task");

  const taskAssignees = [
    "Assignees1",
    "Assignees2",
    "Assignees3",
    "Assignees4",
    "Assignees5",
    "Assignees6",
    "Assignees7",
  ];

  const handleRemoveAssignee = (assigneeToRemove) => {
    setAssignees(assignees.filter((a) => a !== assigneeToRemove));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

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
  //handle updated task
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      const updatedTask = {
        id: taskToEdit.id,
        title: task,
        descp: descp,
        assignees: assignees,
        status: status,
      };
      //update Task
      onEditTaskSubmit(updatedTask);
    } else {
      addTask(task, descp, assignees, status);
      setStatus("ToDo's");
      setTask("");
      setDescp("");
      setAssignees([]);
    }
    onClose();
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={handleFormSubmit}>
          <FormControl
            id="form-dialog-add-new-task"
            fullWidth={true}
            justify-content="space-between"
          >
            <Box
              id="box-dialog-add-new-task"
              className="box-dialog-add-edit-task"
              sx={{
                columnCount: 3,
                flexDirection: "column",
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Title"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />

              <TextField
                label="Description"
                size="small"
                value={descp}
                onChange={(e) => setDescp(e.target.value)}
              />
              <Divider />
              <Autocomplete
                multiple
                id="taskAssignee"
                options={taskAssignees}
                value={assignees}
                onChange={(e, newValue) => setAssignees(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Assignee" />
                )}
                renderTags={(value, getAssigneeProps) =>
                  value.map((assignees, index) => (
                    <Chip
                      key={index}
                      label={assignees}
                      {...getAssigneeProps({ index })}
                      onDelete={() => handleRemoveAssignee(assignees)}
                    />
                  ))
                }
              />
              <RadioGroup
                row
                name="Status"
                value={status}
                onChange={handleStatusChange}
              >
                <FormLabel>Status</FormLabel>
                <FormControlLabel
                  value="ToDo's"
                  control={<Radio />}
                  label="ToDo's"
                />
                <FormControlLabel
                  value="InProgress"
                  control={<Radio />}
                  label="InProgress"
                />
                <FormControlLabel
                  value="Completed"
                  control={<Radio />}
                  label="Completed"
                />
              </RadioGroup>
              <Button variant="contained" type="submit">
                {isEditMode ? "Update Task" : "Add Task"}
              </Button>
            </Box>
          </FormControl>
        </form>
      </Container>
    </div>
  );
};
