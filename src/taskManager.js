import { Project } from "./projects";

class TaskManager {
  constructor() {
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProject(projectID) {
    return this.projects.find((project) => project.getProjectID() === projectID);
  }

  addProject(newProject) {
    if (
      this.projects.find((project) => project.getTitle() === newProject.title)
    )
      return;
    this.projects.push(newProject);
  }

  removeProject(projectID) {
    this.projects = this.projects.filter(
      (project) => project.projectID !== projectID,
    );
  }
}

export { TaskManager };
