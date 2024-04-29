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

  // Add static methods for adding/removing projects and tasks, as well as editing tasks
}

export { Storage };
