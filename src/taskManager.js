import { Project } from "./projects";

class TaskManager {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Overdue"));
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("This Week"));
  }

  getProjects() {
    return this.projects;
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProject(projectTitle) {
    return this.projects.filter(
      (project) => project.getTitle() === projectTitle,
    );
  }

  addProject(newProject) {
    if (
      this.projects.find((project) => project.getTitle() === newProject.title)
    )
      return;
    this.projects.push(newProject);
  }

  removeProject(projectTitle) {
    this.projects = this.projects.filter(
      (project) => project.title !== projectTitle,
    );
  }
}

export { TaskManager };
