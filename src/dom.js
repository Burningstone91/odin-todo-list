import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";

class DOM {
  static renderProject(projectID) {
    DOM.clear();
    const project = Storage.getTasksFromStorage().getProject(+projectID)

    document.querySelector(".project-title").textContent = project.getTitle();
    document.querySelector(".project-title").id = "P-" + projectID;

    const tasks = project.getTasks();
    tasks.forEach((task) => DOM.renderTask(task));
  }

  static renderTask(task) {
    const body = document.querySelector("body");
    const taskDiv = document.createElement("div");
    const taskID = "T-" + task.getTaskID();
    taskDiv.classList.add("task-item");
    taskDiv.id = taskID
    body.appendChild(taskDiv);

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("task-header");
    let icon = "fa fa-circle-thin";
    if (task.isCompleted()) {
      headerDiv.classList.add("complete");
      icon = "fa fa-check-circle";
    }
    headerDiv.innerHTML = `
      <button class="btn toggle">
        <i class="${icon}"></i>
      </button>
      <p class="task-title">${task.getTitle()}</p>
      `;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("task-details");
    detailsDiv.innerHTML = `
      <textarea class="task-desc wrap="soft">${task.getDescription()}</textarea>  
      <div class="task-footer">
        <input
          type="date"
          id="task-due-date"
          name="trip-start"
          value="${task.getDueDate()}" />
        <button class="btn remove">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;

    taskDiv.appendChild(headerDiv);
    taskDiv.appendChild(detailsDiv);

    DOM.handleTaskEvents();
  }

  static handleTaskEvents() {
    const taskItems = document.querySelectorAll(".task-header");
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

    const projectID = document.querySelector(".project-title").id.substring(2);
    const taskID = e.target.parentNode.parentNode.parentNode.id
    Storage.removeTask(projectID, taskID);
    DOM.renderProject(projectID);
  }

  static toggleTask(e) {
    e.stopPropagation();

    const projectID = document.querySelector(".project-title").id.substring(2);
    const taskID = e.target.parentNode.parentNode.id;

    Storage.toggleTask(projectID, taskID);
    DOM.renderProject(projectID);
  }

  static editTask(e) {
    e.stopPropagation();

    const taskItems = document.querySelectorAll(".task-header");
    taskItems.forEach((task) =>
      task.removeEventListener("click", DOM.editTask),
    );

    const taskItem = e.target.parentNode.parentNode;
    taskItem.classList.add("edit");
    document.querySelector("body").classList.add("blur");

    document.addEventListener("click", DOM.stopEditTask);
  }

  static stopEditTask(e) {
    const taskItem = document.querySelector(".edit");

    if (!taskItem.contains(e.target)) {
      taskItem.classList.remove("edit");
      document.querySelector("body").classList.remove("blur");
      document.removeEventListener("click", DOM.stopEditTask);
      DOM.saveTask(taskItem);
    }
  }

  static saveTask(taskItem) {
    console.log(taskItem);
    const projectID = document.querySelector(".project-title").id.substring(2);
    DOM.renderProject(projectID);
  }

  static clear() {
    document.querySelector("body").innerHTML = `
      <h1 class="project-title"></h1>
    `;
  }
}

export { DOM };
