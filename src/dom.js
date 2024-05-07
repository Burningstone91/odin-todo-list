import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";

class DOM {
  static renderProject(projectTitle) {
    DOM.clear();

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
    let icon = "fa fa-circle-thin";

    if (task.isCompleted()) {
      taskElement.classList.add("complete");
      icon = "fa fa-check-circle";
    }

    taskElement.innerHTML = `
      <button class="btn toggle">
        <i class="${icon}"></i>
      </button>
      <p class="task-title">${task.getTitle()}</p>
      <p class="task-due-date">${task.getDueDate()}</p>
      <button class="btn remove">
        <i class="fa fa-trash"></i>
      </button>
    `;
    tasksDiv.appendChild(taskElement);
    DOM.handleTaskEvents();
  }

  static handleTaskEvents() {
    const taskItems = document.querySelectorAll(".task-item");
    const removeBtns = document.querySelectorAll(".btn.remove");
    const completeBtns = document.querySelectorAll(".btn.toggle");

    removeBtns.forEach((btn) => btn.addEventListener("click", DOM.removeTask));
    completeBtns.forEach((btn) =>
      btn.addEventListener("click", DOM.toggleTask),
    );
    taskItems.forEach((task) => task.addEventListener("click", DOM.editTask));
  }

  static removeTask(e) {
    e.stopPropagation();

    const projectTitle = document.querySelector(".project-title").textContent;
    const taskTitle =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .textContent;

    Storage.removeTask(projectTitle, taskTitle);
    DOM.renderProject(projectTitle);
  }

  static toggleTask(e) {
    e.stopPropagation();

    const projectTitle = document.querySelector(".project-title").textContent;
    const taskTitle = e.target.parentNode.nextElementSibling.textContent;

    Storage.toggleTask(projectTitle, taskTitle);
    DOM.renderProject(projectTitle);
  }

  static editTask(e) {
    e.target.classList.add("edit");
  }

  static clear() {
    document.querySelector(".tasks").innerHTML = "";
  }
}

export { DOM };
