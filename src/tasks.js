import { isPast, toDate, isToday, isThisWeek } from "date-fns";

class Task {
  constructor(title, description, dueDate, priority, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  getTaskID() {
    return this.taskID;
  }

  setTaskID(taskID) {
    this.taskID = taskID;
  }

  getProjectID() {
    return this.projectID;
  }

  setProjectID(projectID) {
    this.projectID = projectID;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  isOverdue() {
    return toDate(this.dueDate) < new Date().setHours(0, 0, 0, 0);
  }

  isDueToday() {
    return isToday(toDate(this.dueDate));
  }

  isDueThisWeek() {
    return isThisWeek(toDate(this.dueDate));
  }

  isCompleted() {
    return this.completed;
  }

  toggleStatus() {
    this.completed = !this.completed;
  }
}

export { Task };
