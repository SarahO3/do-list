import "./story.css";

const story = (outlet, onNavigate) => {
  const page = document.createElement("section");

  page.classList.add("story-page");

  page.innerHTML = `
    <div class="story-header">

      <p class="section-eyebrow">
        Our Story
      </p>

      <h1>
        Some evenings are
        meant to be remembered.
      </h1>

    </div>


    <div class="story-feature">

      <div class="story-image">

        <img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
          alt="Warmly lit elegant restaurant interior"
        />

      </div>


      <div class="story-content">

        <p class="story-label">
          The beginning
        </p>

        <h2>
          Born around
          the fire.
        </h2>

        <p>
          Ember & Plate began with a simple belief:
          the best meals are rarely just about the food.
        </p>

        <p>
          They are about the conversation that stretches
          past midnight. The bottle that somehow becomes
          another bottle. The unexpected laugh across the
          table. The person sitting beside you.
        </p>

        <p>
          We created Ember & Plate as a place for those
          moments — an intimate restaurant where fire,
          flavour and atmosphere come together.
        </p>

      </div>

    </div>


    <div class="story-philosophy">

      <p class="section-eyebrow">
        Our Philosophy
      </p>

      <blockquote>
        “Come for the food.
        Stay for the evening.”
      </blockquote>

      <button class="story-menu-button">
        Discover our menu
        <span>→</span>
      </button>

    </div>
  `;

  const menuButton =
    page.querySelector(".story-menu-button");

  menuButton.addEventListener("click", () => {
    onNavigate("menu");
  });

  outlet.append(page);
};

export default story;