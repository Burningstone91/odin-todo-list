import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";

class DOM {
  static renderProject(projectTitle) {
    document.querySelector(".project-title").textContent = projectTitle;

    const tasks = Storage.getTasksFromStorage()
      .getProject(projectTitle)
      .getTasks();
    tasks.forEach((task) => DOM.renderTask(task));
  }

  static renderTask(task) {
    const tasksDiv = document.querySelector(".tasks");

    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
      <button class="btn complete">
        <i class="fa fa-circle-thin"></i>
      </button>
      <p class="task-title">${task.getTitle()}</p>
      <p class="task-due-date">${task.getDueDate()}</p>
      <button class="btn remove">
        <i class="fa fa-trash"></i>
      </button>
    `;
    tasksDiv.appendChild(taskElement);
  }
}

export { DOM };
