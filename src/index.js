import "./styles.css";
import { Task } from "./tasks";
import { Project } from "./projects";
import { TaskManager } from "./taskManager";

const tasks = new TaskManager();

const project1 = new Project("Sample Project");
tasks.addProject(project1);

const task1 = new Task("Task 1", "desc", "tomorrow", "high");
const task2 = new Task("Task 2", "desc", "tomorrow", "high");

tasks.getProject("Inbox")[0].addTask(task1);
console.log(tasks.getProjects());
