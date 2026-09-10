 import "./navbar.css"

 
 //header/creatensvbar doesnt care where it lives...we give it a parent and it
 //mount itself there
 const createNavbar = (parent, onNavigate) => {
    const header = document.createElement("header")
    const nav = document.createElement("nav")
  

    const brand = document.createElement("div")
    brand.classList.add("brand")

    brand.innerHTML = `
    <span class="brand-name">EMBER AND PLATE</span>
    <span class="brand-tagline">where the night begins</span>
    `

    const navLinks = document.createElement("div")
    navLinks.classList.add("nav-links")

    const pages  = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "menu" },
    { name: "Our Story", id: "story" },
    { name: "Contact", id: "contact" },
    ];


    //our glow element
     const ember = document.createElement("span")
     ember.classList.add("nav-ember")

     const emberGlow = document.createElement("span")
     emberGlow.classList.add("ember-glow")

     const emberFlame = document.createElement("span")
     emberFlame.classList.add("ember-flame")

    const heat = document.createElement("span")
     heat.classList.add("ember-heat")
     
     ember.append(emberGlow, emberFlame, heat);


     for (let i = 0; i < 3; i++) {
  const particle = document.createElement("span");

  particle.classList.add("ember-particle");

  particle.style.setProperty(
    "--particle-delay",
    `${i * 700}ms`
  );

  particle.style.setProperty(
    "--particle-x",
    `${(i - 1) * 0.7}rem`
  );

  ember.append(particle);
}

     //helper function for whichever button clicked
    const moveEmber = (button) => {
        //we find the horizontal center of the button
        const buttonCenter =
         button.offsetLeft + button.offsetWidth / 2

        ember.style.left = 
        `${buttonCenter - ember.offsetWidth /2}px`
        
        ember.style.opacity = "1"
    }


    const setActivePage = (pageName) => {
        const buttons  = navLinks.querySelectorAll(".nav-button")

        buttons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageName
            )
        })

        const activeButton = navLinks.querySelector(`[data-page="${pageName}"]`)
    
        if(activeButton){
            moveEmber(activeButton)
        }
    }

    pages.forEach((page) => {
        const button = document.createElement("button")
       
        button.textContent = page.name;
        button.dataset.page = page.id;
        button.classList.add("nav-button")


        button.addEventListener("click", () => {
            onNavigate(page.id)
         })

        
        navLinks.appendChild(button)
    })



    nav.append(brand, navLinks, ember)
    header.append(nav)
    parent.append(header)

    const homeButton = navLinks.querySelector('[data-page="home"]')
    homeButton.classList.add("active")

    requestAnimationFrame(() => {
        moveEmber(homeButton)
    })

    return {
        header,
        setActivePage,
    }

}

export default createNavbar