import "./home.css";

import createSignaturePlates from "../../components/signaturePlates/signaturePlates.js";

const home = (outlet, onNavigate) => {
  const page = document.createElement("section");
  page.classList.add("home-page");

  
  page.innerHTML = `
  <div class="hero">

    <div class="hero-overlay"></div>

    <div class="hero-content">

      <p class="hero-eyebrow">
        Dinner · Drinks · Intimate Evenings
      </p>

      <h1>
        Where the night<br>
        begins with fire.
      </h1>

      <p class="hero-description">
        An intimate dining experience shaped by flame,
        flavour and the people you choose to share it with.
      </p>

      <div class="hero-actions">

        <button class="hero-cta primary-cta">
          Explore the Menu
        </button>

        <button class="hero-cta secondary-cta">
          Reserve a Table
        </button>

      </div>

    </div>

    <div class="scroll-indicator">
      <span>Discover</span>
      <span class="scroll-line"></span>
    </div>

  </div>


  <section class="experience-section">

    <div class="experience-image">
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        alt="Elegant restaurant table prepared for an evening dinner"
      />
    </div>

    <div class="experience-content">

      <p class="section-eyebrow">
        The Ember & Plate Experience
      </p>

      <h2>
        An evening worth
        lingering over.
      </h2>

      <p>
        We believe dinner should never feel rushed.
        Ember & Plate was created for long conversations,
        slow pours, shared plates and the kind of evenings
        you wish could last a little longer.
      </p>

      <p>
        Every detail is designed around the simple pleasure
        of being present — good food, warm firelight and
        wonderful company.
      </p>

      <button
        class="text-link"
        data-page="story"
      >
        Discover our story
        <span>→</span>
      </button>

    </div>

  </section>
`;
createSignaturePlates(page, onNavigate);

  const storyButton = page.querySelector(".text-link");
  const menuButton = page.querySelector(".primary-cta")
  const reservationButton = page.querySelector(".secondary-cta")
  

   storyButton.addEventListener("click", () =>{
    onNavigate("story")
  })
  
  menuButton.addEventListener("click", () => {
    onNavigate("menu")
  })

  reservationButton.addEventListener("click", () => {
    onNavigate("contact")
  })
 

 

  outlet.append(page);
};

export default home;