import { Task } from "./tasks";
import { Project } from "./projects";
import { TaskManager } from "./taskManager";

class Storage {
  static getTasksFromStorage() {
    const tasks = Object.assign(
      new TaskManager(),
      JSON.parse(localStorage.getItem("task-list")),
    );

    tasks.setProjects(
      tasks
        .getProjects()
        .map((project) => Object.assign(new Project(), project)),
    );

    tasks
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new Task(), task)),
        ),
      );

    return tasks;
  }

  static saveTasksInStorage(tasks) {
    localStorage.setItem("task-list", JSON.stringify(tasks));
  }

  static addProject(project) {
    const tasks = Storage.getTasksFromStorage();
    tasks.addProject(project);
    Storage.saveTasksInStorage(tasks);
  }

  static removeProject(projectTitle) {
    const tasks = Storage.getTasksFromStorage();
    tasks.removeProject(projectTitle);
    Storage.saveTasksInStorage(tasks);
  }

  static addTask(projectTitle, task) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectTitle).addTask(task);
    Storage.saveTasksInStorage(tasks);
  }

  static removeTask(projectTitle, taskTitle) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectTitle).removeTask(taskTitle);
    Storage.saveTasksInStorage(tasks);
  }
}

export { Storage };
