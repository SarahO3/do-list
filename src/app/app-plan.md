# Todo List Application Plan

## 1. Data Model

### TODO

```
id
title
description
dueDate
priority
completed
projectId
```

### Todo Properties

**id**

```
uniquely identifies ONE Todo
must be different from every other Todo
```

**title**

```
short name of the task
```

**description**

```
additional information about the task
```

**dueDate**

```
date the task should be completed
```

**priority**

```
level of importance

allowed values:
    decide the values you want to support
```

**completed**

```
stores whether the Todo is completed

initial value must be false
```

**projectId**

```
identifies the Project this Todo belongs to

can contain a Project ID

can also be null when the Todo does not belong to a Project
```

### Todo Factory

```
RECEIVE Todo information

CREATE and RETURN one Todo object

SET default values where necessary

RETURN the completed Todo object
```

## 2. Project Data

### PROJECT

```
id
name
```

A Project exists independently from a Todo.

A Todo can belong to a Project through `projectId`.

A Todo does not store an entire Project object.

A Project does not need to contain duplicate Todo objects.

The application uses the Project ID to establish the relationship between a Todo and a Project.

A Todo can also exist without a Project.

When a Todo has no Project:

```
projectId = null
```

## 3. Application State

```
projects
todos
selectedProjectId
modalMode
activeTodoId
```

### projects

```
collection containing every Project in the application
```

### todos

```
collection containing every Todo in the application
```

### selectedProjectId

```
ID of the Project currently selected by the user

used to determine which Project's Todos should be displayed

can be null when no Project is selected
```

### modalMode

```
determines what the Todo modal is currently doing

allowed modes:

    CREATE
    VIEW
    EDIT
```

### activeTodoId

```
ID of the Todo currently being viewed or edited

null when no Todo is currently active
```

## 4. Application Startup

### First Visit

APPLICATION STARTS

```
↓
```

CHECK localStorage

```
↓
```

IF saved Project data does NOT exist

```
CREATE a default Project

ADD the default Project to projects collection

↓
```

IF saved Todo data does NOT exist

```
CREATE an empty todos collection

↓
```

RECONSTRUCT the required application data

```
↓
```

SET selectedProjectId

```
TO the default Project's ID

↓
```

SET activeTodoId

```
TO null

↓
```

SET modalMode

```
TO null

↓
```

RENDER application

### Returning User

APPLICATION STARTS

```
↓
```

CHECK localStorage

```
↓
```

IF saved Project data exists

```
LOAD saved Projects

↓
```

IF saved Todo data exists

```
LOAD saved Todos

↓
```

RECONSTRUCT the required application data

```
↓
```

SET selectedProjectId

```
TO the first available Project

↓
```

SET activeTodoId

```
TO null

↓
```

SET modalMode

```
TO null

↓
```

RENDER application

## 5. Project Selection

USER CLICKS A PROJECT

```
↓
```

GET the Project's ID

```
↓
```

SET selectedProjectId

```
TO the clicked Project's ID

↓
```

GET Todos whose projectId

```
matches selectedProjectId

↓
```

RENDER the selected Project's Todos

```
↓
```

UPDATE the UI

```
so the selected Project is visually identifiable
```

## 6. Create Project

USER CLICKS "NEW PROJECT"

```
↓
```

OPEN Project creation interface

```
↓
```

USER ENTERS Project name

```
↓
```

SUBMIT

```
↓
```

VALIDATE Project name

```
↓
```

CREATE a new Project

```
↓
```

GENERATE unique Project ID

```
↓
```

ADD Project

```
to projects collection

↓
```

SAVE updated Project data

```
to localStorage

↓
```

SET selectedProjectId

```
to the newly created Project's ID

↓
```

RENDER Projects

```
↓
```

RENDER Todos

```
for the newly selected Project
```

## 7. Create Todo

A Todo can be created from:

```
a selected Project
```

OR

```
a general Todo view
```

### When a Project is Selected

USER SELECTS PROJECT

```
↓
```

selectedProjectId

```
becomes that Project's ID

↓
```

USER CLICKS "ADD TODO"

```
↓
```

SET modalMode

```
TO CREATE

↓
```

SET activeTodoId

```
TO null

↓
```

OPEN THE MODAL

```
↓
```

CHANGE modal UI

```
to CREATE mode

↓
```

RESET THE FORM

```
so no previous Todo data remains

↓
```

USER FILLS IN:

```
title
description
dueDate
priority

↓
```

USER SUBMITS FORM

```
↓
```

PREVENT default form submission

```
↓
```

READ form values

```
↓
```

VALIDATE required information

```
↓
```

CREATE a new Todo

```
↓
```

SET the new Todo's projectId

```
to selectedProjectId

↓
```

ADD the new Todo

```
to todos collection

↓
```

SAVE updated Todo data

```
to localStorage

↓
```

CLOSE MODAL

```
↓
```

RENDER selected Project's Todos

### When No Project Is Selected

USER CLICKS "ADD TODO"

```
↓
```

SET modalMode

```
TO CREATE

↓
```

SET activeTodoId

```
TO null

↓
```

OPEN MODAL

```
↓
```

USER ENTERS Todo information

```
↓
```

SUBMIT

```
↓
```

CREATE new Todo

```
↓
```

SET projectId

```
TO null

↓
```

ADD Todo

```
to todos collection

↓
```

SAVE updated data

```
to localStorage

↓
```

CLOSE MODAL

```
↓
```

RENDER appropriate Todo view

## 8. View Todo

USER CLICKS TODO

```
↓
```

GET the Todo's ID

```
↓
```

FIND the Todo

```
using its ID

↓
```

SET activeTodoId

```
to the Todo's ID

↓
```

SET modalMode

```
TO VIEW

↓
```

OPEN MODAL

```
↓
```

DISPLAY the Todo's current information

VIEW mode shows:

```
title
description
dueDate
priority
Project
completed status

↓
```

FORM/DATA MUST NOT BE CHANGED

```
simply because the Todo was opened in VIEW mode
```

Available actions:

```
EDIT
DELETE
CLOSE
```

## 9. Edit Todo

USER CLICKS "EDIT"

```
↓
```

VERIFY activeTodoId

```
identifies an existing Todo

↓
```

FIND the Todo

```
using activeTodoId

↓
```

SET modalMode

```
TO EDIT

↓
```

KEEP activeTodoId

```
unchanged

↓
```

POPULATE the SAME FORM

```
with the existing Todo's information

↓
```

USER CHANGES Todo information

```
↓
```

USER SUBMITS FORM

```
↓
```

PREVENT default form submission

```
↓
```

READ updated form values

```
↓
```

FIND the existing Todo

```
using activeTodoId

↓
```

UPDATE that Todo's properties

```
↓
```

DO NOT create a second Todo

```
↓
```

KEEP the Todo's original ID

```
↓
```

KEEP its current projectId

```
unless the user explicitly chooses to move it

↓
```

SAVE updated data

```
to localStorage

↓
```

CLOSE MODAL

```
↓
```

RENDER Todo list

## 10. Move Todo to Another Project

USER CHOOSES "MOVE TO PROJECT"

```
↓
```

DISPLAY available Projects

```
↓
```

USER SELECTS A PROJECT

```
↓
```

GET selected Project's ID

```
↓
```

FIND the Todo

```
using its ID

↓
```

CHANGE the Todo's projectId

```
to the selected Project's ID

↓
```

SAVE updated data

```
to localStorage

↓
```

RENDER the appropriate Todo list

A Todo can also be removed from a Project:

```
projectId = null
```

## 11. Delete Todo

USER CLICKS DELETE

```
↓
```

GET the Todo ID

```
↓
```

CONFIRM deletion

```
if confirmation is implemented

↓
```

FIND the Todo

```
using its ID

↓
```

REMOVE the Todo

```
from todos collection

↓
```

SAVE updated data

```
to localStorage

↓
```

SET activeTodoId

```
TO null

if the deleted Todo was active

↓
```

CLOSE MODAL

```
↓
```

RENDER Todo list

## 12. Complete Todo

USER CLICKS COMPLETE CHECKBOX/BUTTON

```
↓
```

GET Todo ID

```
↓
```

FIND Todo

```
↓
```

CHANGE completed

```
from false → true

OR

from true → false

↓
```

SAVE updated data

```
to localStorage

↓
```

RENDER Todo list

Completing a Todo does NOT delete it.

## 13. Modal State

### CREATE

```
activeTodoId = null

modalMode = CREATE

form = empty

form fields = editable

submit action = create new Todo
```

### VIEW

```
activeTodoId = existing Todo ID

modalMode = VIEW

form/display = existing Todo information

editing = disabled/read-only

available actions:

    EDIT
    DELETE
    CLOSE
```

### EDIT

```
activeTodoId = existing Todo ID

modalMode = EDIT

form = existing Todo information

form fields = editable

submit action = update existing Todo
```

## 14. Shared Todo Form

The Todo form is responsible for:

```
DISPLAYING fields

COLLECTING user input

READING form values

ALLOWING application logic
to decide what happens with those values
```

Fields:

```
title
description
dueDate
priority
```

The form does NOT need a Project field when a Todo is created from a selected Project.

The application determines the Project through:

```
selectedProjectId
```

Therefore:

```
form data
+
selectedProjectId
=
new Todo
```

When no Project is selected:

```
form data
+
null
=
new Todo
```

## 15. Rendering

### Render Projects

GET projects collection

```
↓
```

FOR EACH Project

```
CREATE DOM representation

DISPLAY Project name

ASSOCIATE DOM element

with Project's ID

ADD Project click behavior

↓
```

DISPLAY Projects

### Render Todos

GET selectedProjectId

```
↓
```

IF a Project is selected

```
FILTER Todos

KEEP only Todos whose projectId
matches selectedProjectId

↓
```

IF no Project is selected

```
DISPLAY Todos whose projectId is null

↓
```

CLEAR current Todo display

```
↓
```

FOR EACH matching Todo

```
CREATE Todo DOM representation

DISPLAY:

    title
    dueDate
    priority
    completion status

ADD controls:

    view
    edit
    delete
    complete/uncomplete

↓
```

DISPLAY Todo list

## 16. Connecting DOM to Data

WHEN creating a Todo DOM element

```
STORE the Todo's ID

on/in the DOM element
```

WHEN the user interacts with that Todo

```
READ the Todo ID

from the clicked element

↓
```

USE that ID

```
to find the actual Todo

in the todos collection
```

The same principle applies to Projects:

```
STORE Project ID

on the Project DOM element

↓
```

READ Project ID

```
when the user clicks the Project

↓
```

USE the ID

```
to find the actual Project
```

## 17. Persistence

Store:

```
projects
todos
```

### Saving

APPLICATION DATA CHANGES

```
↓
```

UPDATE in-memory data

```
↓
```

CONVERT data

```
to JSON

↓
```

SAVE JSON

```
to localStorage
```

### Loading

APPLICATION STARTS

```
↓
```

GET JSON

```
from localStorage

↓
```

IF no data exists

```
use appropriate defaults

↓
```

IF data exists

```
PARSE JSON

↓
```

REBUILD application data

```
↓
```

RENDER

### Reconstructing Todo Data

LOAD saved Todo data

```
↓
```

PARSE JSON

```
↓
```

FOR EACH saved Todo

```
PASS its saved data

through the Todo factory

↓
```

RECREATE the expected Todo object/data structure

```
↓
```

PLACE reconstructed Todos

```
into todos collection
```

## 18. Complete Application Flow

APPLICATION STARTS

```
↓
```

LOAD saved Projects

```
↓
```

LOAD saved Todos

```
↓
```

IF no Projects exist

```
CREATE default Project

ADD default Project

to projects collection

↓
```

IF no Todos exist

```
CREATE empty todos collection

↓
```

RECONSTRUCT loaded data

```
into the application's expected data structure

↓
```

SET selectedProjectId

```
to the first available Project

↓
```

SET activeTodoId

```
TO null

↓
```

SET modalMode

```
TO null

↓
```

RENDER Projects

```
↓
```

RENDER Todos

```
belonging to selectedProjectId

↓
```

APPLICATION READY

### Core Relationship

Projects and Todos are independent.

A Todo MAY belong to a Project.

A Todo MAY exist without a Project.

A Todo can be moved between Projects.

A Todo can be removed from a Project without being deleted.

The relationship is maintained through:

```
Todo.projectId
```
