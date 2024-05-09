import "./styles.css";
import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";
import { DOM } from "./dom";

const proj = new Project("Test Project");
const proj2 = new Project("Second Test");

const task1 = new Task("Some task", "some desc", "2024-12-31", "low");
const task2 = new Task("Pack task", "Take", "2023-12-11", "low");

Storage.addProject(proj);
Storage.addTask("Test Project", task1);
Storage.addTask("Test Project", task2);

console.log(Storage.getTasksFromStorage());

DOM.renderProject("Test Project");
