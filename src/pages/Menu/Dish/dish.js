import "./dish.css";

import { menuData } from "../../../data/menuData.js";

const dish = (outlet, dishId, onNavigate) => {
  const page = document.createElement("section");

  page.classList.add("dish-page");

  const item = menuData.find(
    (item) => item.id === Number(dishId)
  );

  if (!item) {
    page.innerHTML = `
      <div class="dish-not-found">
        <h1>Dish not found</h1>
        <button class="back-menu">
          Return to menu
        </button>
      </div>
    `;

    page
      .querySelector(".back-menu")
      .addEventListener("click", () => {
        onNavigate("menu");
      });

    outlet.append(page);

    return;
  }

  page.innerHTML = `
    <div class="dish-detail">

      <div class="dish-detail-image">
        <img
          src="${item.image}"
          alt="${item.name}"
        />
      </div>

      <div class="dish-detail-content">

        <p class="section-eyebrow">
          Category: ${item.category}
        </p>

        <h1>
          ${item.name}
        </h1>

        <p class="dish-detail-description">
          ${item.description}
        </p>

        <span class="dish-detail-price">
          €${item.price}
        </span>

        <div class="dish-actions">

          <button class="back-menu">
            ← Back to menu
          </button>

          <button class="reserve-button">
            Reserve a table
          </button>

        </div>

      </div>

    </div>
  `;

  page
    .querySelector(".back-menu")
    .addEventListener("click", () => {
      onNavigate("menu");
    });

  page
    .querySelector(".reserve-button")
    .addEventListener("click", () => {
      onNavigate("contact");
    });

  outlet.append(page);
};

export default dish;