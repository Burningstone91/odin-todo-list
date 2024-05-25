import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";

class DOM {
  static renderHomePage() {
    const projects = Storage.getTasksFromStorage().getProjects();

    const projectList = document.querySelector(".project-list");

    projects.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.innerHTML = `
      <i class="fa fa-briefcase"></i>
      <p class="P-${project.getProjectID()}">${project.getTitle()}</p>
      `
      projectList.appendChild(projectItem);
      })

    // Render project when clicking on its title in the sidebar
    const projectTitles = document.querySelectorAll("li > p");
    [...projectTitles].forEach((projectTitle) => {
      projectTitle.addEventListener("click", (e) => {
        DOM.renderProject(+e.target.classList[0].substring(2))
        DOM.toggleSidebar();
      })
    })

    // Add code for button for adding a project
    
    document.querySelector(".open-nav").addEventListener("click", DOM.toggleSidebar)

    //Change to Inbox project once implemented
    DOM.renderProject(1)
  }
  
  static toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("closed");
      
    const btnOpenNav = document.querySelector(".open-nav");
    if (!btnOpenNav.classList.contains("open")) {
      btnOpenNav.classList.add("open");
    } else {
      document.querySelector(".open-nav").classList.toggle("open");
    }
  }

  static renderProject(projectID) {
    DOM.clear();
    const project = Storage.getTasksFromStorage().getProject(+projectID)

    document.querySelector(".project-title").textContent = project.getTitle();
    document.querySelector(".project-title").id = "P-" + projectID;

    const tasks = project.getTasks();
    tasks.forEach((task) => DOM.renderTask(task));

    const addTaskDialog = document.querySelector(".add-task-dialog");
    document.querySelector(".btn.add-task").addEventListener("click", () => {
      addTaskDialog.showModal();  
    })

    document.querySelector(".btn.close").addEventListener("click", () => {
      addTaskDialog.close();
    })
  }

  static renderTask(task) {
    const main = document.querySelector("main");
    const taskDiv = document.createElement("div");
    const taskID = "T-" + task.getTaskID();
    taskDiv.classList.add("task-item");
    taskDiv.id = taskID
    main.appendChild(taskDiv);

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
      <input type="text" class="task-title" value="${task.getTitle()}" />
      `;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("task-details");
    detailsDiv.innerHTML = `
      <textarea class="task-desc" wrap="soft">${task.getDescription()}</textarea>  
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
    const taskID = e.target.parentNode.parentNode.parentNode.parentNode.id.substring(2);

    Storage.removeTask(+projectID, +taskID);
    DOM.renderProject(projectID);
  }

  static toggleTask(e) {
    e.stopPropagation();

    const projectID = document.querySelector(".project-title").id.substring(2);
    const taskID = e.target.parentNode.parentNode.parentNode.id.substring(2);
    Storage.toggleTask(+projectID, +taskID);
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
    const projectID = document.querySelector(".project-title").id.substring(2);

    if (!taskItem.contains(e.target)) {
      document.removeEventListener("click", DOM.stopEditTask);
      
      const taskID = taskItem.id.substring(2);
      const taskTitle = document.querySelector(".edit .task-title").value;
      const description = document.querySelector(".edit .task-desc").value;
      const dueDate = document.querySelector(".edit #task-due-date").value;

      Storage.setTaskTitle(+projectID, +taskID, taskTitle);
      Storage.setTaskDescription(+projectID, +taskID, description);
      Storage.setTaskDueDate(+projectID, +taskID, dueDate);

      taskItem.classList.remove("edit");
      
      DOM.renderProject(projectID)
    }
  }

  static clear() {
    document.querySelector("body").classList.remove("blur");
    document.querySelector("main").innerHTML = `
      <div class="project-header">
        <h2 class="project-title"></h2>
        <button class="btn add-task">+</button>
      </div>
      `;
  }
}

export { DOM };
