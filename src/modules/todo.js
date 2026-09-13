export function Todo(title, description, dueDate, priority, projectId){
   
   const id = crypto.randomUUID()
   
   
 const completed = false

if(!projectId){
    projectId = null
}

    return {
    id,
    title,
    description,
    dueDate,
    completed,
    priority,
    projectId
    }
}