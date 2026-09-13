import {
    activeTodoId,
    createProject,
    createTodo,
    deleteProject,
    deleteTodo,
    getModalMode,
    getProject,
    getTodo,
    getTodosForProject,
    getUnassignedTodos,
    moveTodo,
    projects,
    selectedProjectId,
    selectModalMode,
    selectProject,
    selectTodo,
    toggleTodo,
    updateTodo
} from "./app.js";

// DOM ELEMENTS

const projectContainer = document.getElementById("projectContainer");
const currentProject = document.getElementById("currentProject");

const todoContainer = document.getElementById("todoContainer");
const todoDialog = document.getElementById("todoModal");
const todoForm = document.getElementById("todoForm");
const todoView = document.getElementById("todoView");
const todoProject = document.getElementById("todoProject");
const addTodo = document.getElementById("addTodo");
const editTodo = document.getElementById("editTodo");

const addProject = document.getElementById("addProject");
const projectDialog = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm");

const showUnassigned = document.getElementById("showUnassigned");

const deleteButton = document.getElementById("deleteTodo");
const deleteDialog = document.getElementById("confirmModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");


const closeModal = document.getElementById("closeModal");
const cancelTodo = document.getElementById("cancelTodo");

const closeProjectModal = document.getElementById("closeProjectModal");
const cancelProject = document.getElementById("cancelProject");

const closeConfirmModal = document.getElementById("closeConfirmModal");

// DELETE STATE

let pendingDelete = null;



// PROJECTS


export const renderProjects = () => {

    projectContainer.textContent = "";

    projects.forEach((project) => {

        const card = document.createElement("div");

        card.dataset.projectId = project.id;

        card.innerHTML = `
            <h2>${project.name}</h2>
            <button type="button" class="delete-project">
                Delete
            </button>
        `;

        const deleteProjectButton = card.querySelector(".delete-project");

        deleteProjectButton.addEventListener("click", (e) => {
            e.stopPropagation();

            pendingDelete = {
                type: "project",
                id: project.id
            };

            deleteDialog.showModal();
        });

        card.addEventListener("click", () => {

            selectProject(project.id);

            currentProject.textContent = project.name;

            renderTodos(project.id);
        });

        projectContainer.append(card);
    });

    const selectedProject = getProject(selectedProjectId);

    if (selectedProject && typeof selectedProject !== "string") {
        currentProject.textContent = selectedProject.name;
    }
};

const renderTodoList = (todosToRender) => {

    todoContainer.textContent = "";

    todosToRender.forEach((todo) => {

        const todoElement = document.createElement("div");

        todoElement.dataset.id = todo.id;

        todoElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox">
            <h2>${todo.title}</h2>
            <p>${todo.dueDate}</p>
            <p>${todo.priority}</p>
        `;

        const checkbox = todoElement.querySelector(".todo-checkbox");

        checkbox.checked = todo.completed;

        checkbox.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        checkbox.addEventListener("change", () => {
            toggleTodo(todo.id);
        });

        todoElement.addEventListener("click", () => {

            selectTodo(todo.id);
            selectModalMode("VIEW");

            todoDialog.showModal();

            todoForm.hidden = true;
            todoView.hidden = false;

            document.getElementById("modalTitle").textContent =
                "Todo Details";

            document.getElementById("viewTitle").textContent =
                todo.title;

            document.getElementById("viewDescription").textContent =
                todo.description;

            document.getElementById("viewDueDate").textContent =
                todo.dueDate;

            document.getElementById("viewPriority").textContent =
                todo.priority;

            const project = todo.projectId
                ? getProject(todo.projectId)
                : null;

            document.getElementById("viewProject").textContent =
                project
                    ? project.name
                    : "No Project";

            document.getElementById("viewStatus").textContent =
                todo.completed
                    ? "Completed"
                    : "Incomplete";
        });

        todoContainer.append(todoElement);
    });
};

export const renderTodos = (projectId) => {

    const projectTodos = getTodosForProject(projectId);

    renderTodoList(projectTodos);
};


showUnassigned.addEventListener("click", () => {

    selectProject(null);

    currentProject.textContent = "Unassigned";

    const unassignedTodos = getUnassignedTodos();

    renderTodoList(unassignedTodos);
});

const renderProjectOptions = () => {

    todoProject.innerHTML = `
        <option value="">
            No Project
        </option>
    `;

    projects.forEach((project) => {

        const option = document.createElement("option");

        option.value = project.id;
        option.textContent = project.name;

        todoProject.append(option);
    });
};

// CREATE TODO
addTodo.addEventListener("click", () => {

    selectModalMode("CREATE");

    todoForm.hidden = false;
    todoView.hidden = true;

    document.getElementById("modalTitle").textContent =
        "Add Todo";

    todoForm.reset();

     renderProjectOptions();
    todoDialog.showModal();
});


// CREATE / EDIT TODO


todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("todoTitle").value;
    const description = document.getElementById("todoDescription").value;
    const dueDate = document.getElementById("todoDueDate").value;
    const priority = document.getElementById("todoPriority").value;
    const projectId = document.getElementById("todoProject").value;


    const mode = getModalMode();

    if (mode === "CREATE") {

        createTodo(
            title,
            description,
            dueDate,
            priority,
            projectId
        );
    }

    if (mode === "EDIT") {

        updateTodo(
            activeTodoId,
            title,
            description,
            dueDate,
            priority
        );

        moveTodo(
            activeTodoId,
            projectId || null
        )
    }

    todoDialog.close();

    todoForm.reset();

    renderTodos(selectedProjectId);
});



// EDIT TODO


editTodo.addEventListener("click", () => {

    const todo = getTodo(activeTodoId);

    selectModalMode("EDIT");

    todoView.hidden = true;
    todoForm.hidden = false;

    document.getElementById("modalTitle").textContent =
        "Edit Todo";

    document.getElementById("todoTitle").value =
        todo.title;

    document.getElementById("todoDescription").value =
        todo.description;

    document.getElementById("todoDueDate").value =
        todo.dueDate;

    document.getElementById("todoPriority").value =
        todo.priority;

        renderProjectOptions();

todoProject.value = todo.projectId || "";
});


// DELETE TODO / PROJECT
deleteButton.addEventListener("click", () => {

    pendingDelete = {
        type: "todo",
        id: activeTodoId
    };

    deleteDialog.showModal();
});


confirmDelete.addEventListener("click", () => {

    if (pendingDelete.type === "todo") {

        deleteTodo(pendingDelete.id);

        todoDialog.close();

        renderTodos(selectedProjectId);
    }

    if (pendingDelete.type === "project") {

        deleteProject(pendingDelete.id);

        if (projects.length > 0) {

            const nextProject = projects[0];

            selectProject(nextProject.id);

            currentProject.textContent = nextProject.name;

            renderProjects();

            renderTodos(nextProject.id);

        } else {

            selectProject(null);

            currentProject.textContent = "";

            renderProjects();

            todoContainer.textContent = "";
        }
    }

    pendingDelete = null;

    deleteDialog.close();
});

cancelDelete.addEventListener("click", () => {

    pendingDelete = null;

    deleteDialog.close();
});


// CREATE PROJECT

addProject.addEventListener("click", () => {
    projectForm.reset();
    projectDialog.showModal();
});


projectForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const projectName =
        document.getElementById("projectName").value;

    createProject(projectName);

    projectDialog.close();

    projectForm.reset();

    renderProjects();
});

//cancel and close modals

closeModal.addEventListener("click", () => {
    todoDialog.close();
});

cancelTodo.addEventListener("click", () => {
    todoDialog.close();
});


closeProjectModal.addEventListener("click", () => {
    projectDialog.close();
});

cancelProject.addEventListener("click", () => {
    projectDialog.close();
});

closeConfirmModal.addEventListener("click", () => {
    deleteDialog.close();
});

cancelDelete.addEventListener("click", () => {
    deleteDialog.close();
});