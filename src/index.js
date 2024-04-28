import "./styles.css";
import { Task } from "./tasks";
import { Project } from "./projects";
import { TaskManager } from "./taskManager";

const tasks = new TaskManager();

const project1 = new Project("Sample Project");
tasks.addProject(project1);

const task1 = new Task("Task 1", "desc", "2024-04-28", "high");
const task2 = new Task("Task 2", "desc", "2024-04-18", "high");

tasks.removeProject("Overdue");
tasks.getProject("Inbox").addTask(task1);
console.log(tasks.getProjects());

console.log(task1.isDueToday());
console.log(task1.isOverdue());
console.log(task1.isDueThisWeek());
console.log(task2.isDueToday());
console.log(task2.isOverdue());
console.log(task2.isDueThisWeek());
