import "./styles.css";
import { Task } from "./tasks";
import { Project } from "./projects";

const testTask = new Task("Titel", "Etwas zu tun", "tomorrow", "high");
const testTask2 = new Task("Titel2", "Etwas zu tun", "today", "low");

console.log(testTask);
console.log(testTask2);

const testProject = new Project("Test Project");
console.log(testProject.getTasks());

testProject.addTask(testTask);
testProject.addTask(testTask2);
console.log(testProject.getTasks());

testProject.removeTask(testTask.getTitle());
console.log(testProject.getTasks());
