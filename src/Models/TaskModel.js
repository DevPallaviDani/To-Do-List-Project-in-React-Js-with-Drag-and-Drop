class TaskModel {
  constructor(id, title, descp, status,assignees) {
    this.id = id;
    this.title = title;
    this.descp = descp;
    this.status = status;
    this.assignees=assignees;
  }
}
export default TaskModel;
