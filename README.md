# Do List

A minimalistic and elegant Todo List application built with vanilla JavaScript, HTML, CSS, and Webpack.

Do List allows users to organize tasks into projects, create and manage todos, assign tasks to projects, move todos between projects, and keep their tasks saved between sessions using the browser's Local Storage.

## Live Demo

[Live Demo](#)

## Features

* Create and manage projects
* Create todos with:

  * Title
  * Description
  * Due date
  * Priority
  * Project assignment
* Create todos without assigning them to a project
* View todos belonging to a specific project
* View unassigned todos
* View detailed information about a todo
* Edit existing todos
* Change a todo's project
* Mark todos as completed or incomplete
* Delete todos
* Delete projects without deleting their todos
* Automatically move todos from a deleted project to Unassigned
* Persist projects and todos using Local Storage
* Responsive user interface
* Production build using Webpack

## Built With

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* Webpack
* Webpack Dev Server
* Local Storage API

## Project Structure

```text
do-list/
│
├── src/
│   ├── index.js
│   ├── todo.js
│   ├── project.js
│   ├── app.js
│   ├── storage.js
│   ├── dom.js
│   ├── style.css
│   └── template.html
│
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── package.json
├── package-lock.json
└── README.md
```

## Architecture

The application is divided into separate modules so that application logic, storage, and DOM manipulation are kept independent.

### `todo.js`

Contains the Todo factory function used to create todo objects.

Each todo contains:

```javascript
{
    id,
    title,
    description,
    dueDate,
    priority,
    completed,
    projectId
}
```

### `project.js`

Contains the Project factory function used to create project objects.

Each project contains:

```javascript
{
    id,
    name
}
```

### `app.js`

Contains the main application state and application logic.

It is responsible for operations such as:

* Creating projects
* Creating todos
* Selecting projects
* Selecting todos
* Updating todos
* Deleting todos
* Toggling todo completion
* Moving todos between projects
* Deleting projects
* Retrieving projects and todos
* Initializing the application

### `storage.js`

Handles persistence using the browser's Local Storage API.

Projects and todos are converted to JSON before being stored and converted back into JavaScript data when the application loads.

### `dom.js`

Handles the user interface and DOM manipulation.

It is responsible for:

* Rendering projects
* Rendering todos
* Rendering unassigned todos
* Opening and closing dialogs
* Populating forms
* Handling user interactions
* Updating the displayed interface

### `index.js`

Acts as the application's entry point.

It initializes the application and starts the initial rendering process.

## Data Management

The application uses Local Storage to persist user data.

When projects or todos are created, updated, moved, completed, or deleted, the application saves the current state to Local Storage.

When the application starts, previously saved data is loaded automatically.

The application also handles an empty Local Storage state by initializing the application with a default project.

## Webpack

Webpack is used to bundle the application and manage the development and production builds.

The configuration is separated into three files:

### `webpack.common.js`

Contains configuration shared by both development and production environments, including:

* Entry point
* Output directory
* HTML generation
* CSS loading
* HTML loading
* Image assets

### `webpack.dev.js`

Contains development-specific configuration, including:

* Development mode
* Inline source maps
* Webpack Dev Server
* Automatic browser opening

### `webpack.prod.js`

Contains production-specific configuration, including:

* Production mode
* Production source maps

## Getting Started

### Prerequisites

You need Node.js and npm installed on your computer.

### Installation

Clone the repository and move into the project directory:

```bash
git clone <your-repository-url>

cd do-list
```

Install the project dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Webpack Dev Server will build the application and open it in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

Webpack will generate the production files inside the `dist` directory.

## What I Learned

This project helped me strengthen my understanding of:

* JavaScript modules
* Factory functions
* Objects and arrays
* Array methods such as `find`, `filter`, `findIndex`, and `splice`
* DOM manipulation
* Event listeners
* Event propagation
* HTML dialogs and forms
* Form handling
* Application state management
* Local Storage
* JSON serialization and parsing
* Webpack configuration
* Development and production environments
* Separating application logic from DOM logic

## Future Improvements

Possible future improvements include:

* Improved responsive design for smaller screens
* More advanced task sorting and filtering
* Improved priority indicators
* Better date formatting
* Task search
* Additional project management features
* More detailed task organization options

## Acknowledgements

This project was built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

The project requirements provided an opportunity to practice building a complete Todo List application using modular JavaScript and Webpack.

## Author

Sarah Eja Ogbonna

Built with JavaScript, curiosity, and plenty of debugging.
