class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
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

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.title)) return;
    this.tasks.push(newTask);
  }

  removeTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
  }
}

export { Project };
