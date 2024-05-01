import "./styles.css";
import { Storage } from "./storage";
import { Project } from "./projects";
import { Task } from "./tasks";
import { DOM } from "./dom";

const proj = new Project("Test Project");
const proj2 = new Project("Second Test");

const task1 = new Task("Some task", "some desc", "today", "low");
const task2 = new Task("Another task", "some desc", "today", "low");

Storage.addProject(proj);
Storage.addTask("Test Project", task1);
Storage.addTask("Test Project", task2);

console.log(Storage.getTasksFromStorage());

DOM.renderProject("Test Project");
