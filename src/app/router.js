import home from "../pages/Home/home.js";
import menu from "../pages/Menu/menu.js";
import story from "../pages/Story/story.js";
import contact from "../pages/Contact/contact.js"
import dish from "../pages/Menu/Dish/dish.js"

//we make an object of all our routes
const routes = {
    home, 
    menu,
    story,
    contact
}


//outlet here is a variable name 
// representing the dom element where we want page rendered
//we called it main here

//path can be a route name or a route with parameter
// home
// menu
// story
// contact
// menu/11
// menu/14
const router = (outlet, path, onNavigate) => {
    outlet.innerHTML = "";

    //so we destructure path
    const [pageName, parameter] = path.split("/")
    //we dynamically render a route if the page name exists
   

    if(pageName === "menu" && parameter){
        dish(outlet, parameter, onNavigate)
        return
    }

     const page = routes[pageName]
     if(page){
        page(outlet,onNavigate)
     }
}

export default router
