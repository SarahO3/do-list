export const saveData = (projects, todos) => {
localStorage.setItem("projects", JSON.stringify(projects))

localStorage.setItem("todos", JSON.stringify(todos))
};


export const loadData = () => {
const projects = JSON.parse(localStorage.getItem("projects")) || []
 const todos = JSON.parse(localStorage.getItem("todos")) || [];


return {
    projects, todos
 }
}