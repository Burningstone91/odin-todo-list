class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  getProjectID() {
    return this.projectID;
  }

  setProjectID(projectID) {
    this.projectID = projectID;
  }
  
  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTask(taskID) {
    return this.tasks.find((task) => task.getTaskID() === taskID);
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.title)) return;
    this.tasks.push(newTask);
  }

  toggleTask(taskID) {
    this.getTask(taskID).toggleStatus();
  }

  removeTask(taskID) {
    this.tasks = this.tasks.filter((task) => task.getID() !== taskID);
  }
}

export { Project };
