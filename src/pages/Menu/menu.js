import "./menu.css";

import { menuData } from "../../data/menuData.js";

const menu = (outlet, onNavigate) => {
  const page = document.createElement("section");

  page.classList.add("menu-page");

  page.innerHTML = `
    <div class="menu-header">

      <p class="section-eyebrow">
        From Our Kitchen
      </p>

      <h1>
        The Ember & Plate Menu
      </h1>

      <p>
        Slow evenings, generous plates and flavours
        worth remembering.
      </p>

    </div>

    <div class="menu-categories">

      <button class="category-button active" data-category="all">
        All
      </button>

      <button class="category-button" data-category="breakfast">
        Breakfast
      </button>

      <button class="category-button" data-category="lunch">
        Lunch
      </button>

      <button class="category-button" data-category="dinner">
        Dinner
      </button>

    </div>

    <div class="menu-grid"></div>
  `;

  const grid = page.querySelector(".menu-grid");

  const categoryButtons =
    page.querySelectorAll(".category-button");

  const renderMenu = (category = "all") => {

    grid.innerHTML = "";

    const items =
      category === "all"
        ? menuData
        : menuData.filter(
            (item) => item.category === category
          );

    items.forEach((item) => {

      const card = document.createElement("article");

      card.classList.add("menu-card");

      card.innerHTML = `
        <div class="menu-card-image">

          <img
            src="${item.image}"
            alt="${item.name}"
          />

        </div>

        <div class="menu-card-content">

          <div class="menu-card-title">

            <h2>${item.name}</h2>

            <span>€${item.price}</span>

          </div>

          <p>
            ${item.description}
          </p>

          <span class="view-dish">
            View dish →
          </span>

        </div>
      `;

      card.addEventListener("click", () => {
        onNavigate(`menu/${item.id}`);
      });

      grid.append(card);
    });
  };

  categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const category = button.dataset.category;

      categoryButtons.forEach((button) => {
        button.classList.remove("active");
      });

      button.classList.add("active");

      renderMenu(category);
    });
  });

  renderMenu();

  outlet.append(page);
};

export default menu;