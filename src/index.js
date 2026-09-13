import { initializeApp, selectedProjectId } from "./modules/app.js";
import { renderProjects, renderTodos } from "./modules/ui.js";
import "./style.css"


initializeApp();
renderProjects();
renderTodos(selectedProjectId);
