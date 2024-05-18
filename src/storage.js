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

  static generateProjectID() {
    const tasks = Storage.getTasksFromStorage();
    let maxProjectID = 0;
    const values = Object.values(tasks.projects)
    values.map((el) => {
      const projectID = el.projectID;
      maxProjectID = Math.max(maxProjectID, projectID)
    })
    return maxProjectID + 1;
  }

  static addProject(project) {
    const tasks = Storage.getTasksFromStorage();
    project.setProjectID(Storage.generateProjectID());
    tasks.addProject(project);
    Storage.saveTasksInStorage(tasks);
  }

  static removeProject(projectID) {
    const tasks = Storage.getTasksFromStorage();
    tasks.removeProject(projectID);
    Storage.saveTasksInStorage(tasks);
  }

  static generateTaskID() {
    const tasks = Storage.getTasksFromStorage();
    const allTaskIDs = Object.values(tasks.projects).reduce((acc, project) => {
      const taskIDs = project.tasks?.map(task => task.taskID);
      return acc.concat(taskIDs);
    }, []);
    return Math.max(allTaskIDs) + 1; 
  }

  static addTask(projectID, task) {
    const tasks = Storage.getTasksFromStorage();
    task.setTaskID(Storage.generateTaskID());
    task.setProjectID(projectID);
    tasks.getProject(projectID).addTask(task);
    Storage.saveTasksInStorage(tasks);
  }

  static toggleTask(projectID, taskID) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectID).getTask(taskID).toggleStatus();
    Storage.saveTasksInStorage(tasks);
  }

  static setTaskTitle(projectID, taskID, taskTitle) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectID).getTask(taskID).setTitle(taskTitle);
    Storage.saveTasksInStorage(tasks);
  }

  static setTaskDescription(projectID, taskID, description) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectID).getTask(taskID).setDescription(description);
    Storage.saveTasksInStorage(tasks);
  }

  static setTaskDueDate(projectID, taskID, dueDate) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectID).getTask(taskID).setDueDate(dueDate);
    Storage.saveTasksInStorage(tasks);
  }

  static removeTask(projectTitle, taskTitle) {
    const tasks = Storage.getTasksFromStorage();
    tasks.getProject(projectTitle).removeTask(taskTitle);
    Storage.saveTasksInStorage(tasks);
  }
}

export { Storage };
