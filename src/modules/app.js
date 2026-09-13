
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { saveData, loadData } from "./storage.js";

const projects = [];
const todos = [];

let selectedProjectId = null;
let modalMode = null;
let activeTodoId = null;
let activeProjectId = null;

const createProject = (name) => {
    const project = Project(name);

    projects.push(project);

    saveData(projects, todos);

    return project;
};

const selectProject = (projectId) => {
    selectedProjectId = projectId;
};

const selectModalMode = (mode) => {
    modalMode = mode;
};

const getModalMode = () => {
    return modalMode;
};

const selectTodo = (todoId) => {
    activeTodoId = todoId;
};

const createTodo = (title, description, dueDate, priority) => {
    const todo = Todo(
        title,
        description,
        dueDate,
        priority,
        selectedProjectId || null
    );

    todos.push(todo);

    saveData(projects, todos);

    return todo;
};

const getTodosForProject = (id) => {
    return todos.filter(todo => todo.projectId === id);
};

const getUnassignedTodos = () => {
    return todos.filter(todo => todo.projectId === null);
};

const updateTodo = (id, title, description, dueDate, priority) => {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return "Todo does not exist";
    }

    Object.assign(todo, {
        title,
        description,
        dueDate,
        priority
    });

    saveData(projects, todos);

    return todo;
};

const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return "Todo does not exist";
    }

    const [deleted] = todos.splice(todoIndex, 1);

    if (activeTodoId === id) {
        activeTodoId = null;
    }

    saveData(projects, todos);

    return deleted;
};

const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return "Todo does not exist";
    }

    todo.completed = !todo.completed;

    saveData(projects, todos);

    return todo;
};

const moveTodo = (todoId, projectId) => {
    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return "Todo does not exist";
    }

    todo.projectId = projectId;

    saveData(projects, todos);

    return todo;
};

const deleteProject = (id) => {
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex === -1) {
        return "Project does not exist";
    }

    const [deleted] = projects.splice(projectIndex, 1);

    const projectTodos = todos.filter(todo => todo.projectId === id);

    projectTodos.forEach(todo => {
        todo.projectId = null;
    });

    if (selectedProjectId === id) {
        selectedProjectId = null;
    }

    saveData(projects, todos);

    return deleted;
};

const getProject = (id) => {
    const project = projects.find(project => project.id === id);

    if (!project) {
        return undefined;
    }

    return project;
};

const getTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return "Todo does not exist";
    }

    return todo;
};



const initializeApp = () => {
    const loadedData = loadData();

    const loadedProjects = loadedData.projects;
    const loadedTodos = loadedData.todos;

    projects.push(...loadedProjects);
    todos.push(...loadedTodos);

    if (projects.length === 0) {
        createProject("Welcome");
    }

    if (projects.length > 0) {
        const curProject = projects[0];

        selectProject(curProject.id);
    }
};

export {
    projects,
    todos,
    selectedProjectId,
    activeTodoId,
    activeProjectId,
    createProject,
    selectProject,
    selectModalMode,
    selectTodo,
    createTodo,
    getTodosForProject,
    getUnassignedTodos,
    updateTodo,
    deleteTodo,
    toggleTodo,
    moveTodo,
    deleteProject,
    getProject,
    getTodo,
    getModalMode,
    initializeApp
};

