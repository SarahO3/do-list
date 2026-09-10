import "../css/global.css"
import "./appLayout.css"

import createNavbar from "../components/Navbar/navbar.js"
import router from "./router.js"


const createAppLayout = () => {
    const app = document.querySelector("#app")

   
    //houses navbar
    const layout = document.createElement("div")
    layout.classList.add("app-layout")

    const main = document.createElement("main")
    main.id = "outlet"

    let navbar;

    // Whenever someone gives me a page name, send it to the router,
    //  tell the router where to render it (main),
    //  and give the router this same navigation function.
    
    
    //navigation
    const navigate = (pageName) => {
        router(main, pageName, navigate)
        navbar.setActivePage(pageName)
    }

     navbar = createNavbar(layout, navigate)

    layout.append(main)
    app.append(layout)

    //inital page load shows home page
    navigate("home")
    
    return main
}

export default createAppLayout