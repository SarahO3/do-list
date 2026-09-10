import "./signaturePlates.css";

import { menuData } from "../../data/menuData.js";

const createSignaturePlates = (parent, onNavigate) => {

  const section = document.createElement("section");

  section.classList.add("signature-section");

  section.innerHTML = `
    <div class="signature-heading">

      <p class="section-eyebrow">
        From the Kitchen
      </p>

      <h2>
        Plates made for
        <em>sharing.</em>
      </h2>

      <p>
        A few of the dishes that define an Ember & Plate evening.
      </p>

    </div>

    <div class="signature-grid"></div>

    <button class="menu-link">
      Explore the full menu
      <span>→</span>
    </button>
  `;

  const grid = section.querySelector(".signature-grid");

  const signatureItems = menuData.filter(
    (item) => item.category === "dinner"
  ).slice(0, 3);

  signatureItems.forEach((item) => {
    const card = document.createElement("article");

    card.classList.add("dish-card");

    card.innerHTML = `
      <div class="dish-image">
        <img
          src="${item.image}"
          alt="${item.name}"
        />
      </div>

      <div class="dish-info">

        <div class="dish-title-row">
          <h3>${item.name}</h3>
          <span>€${item.price}</span>
        </div>

        <p>
          ${item.description}
        </p>

      </div>
    `;

     card.dataset.id = item.id
    card.addEventListener("click", () => {
        onNavigate(`menu/${item.id}`)
    })
    
    grid.append(card);
  });

  
  const menuButton = section.querySelector(".menu-link");

  menuButton.addEventListener("click", () => {
    onNavigate("menu");
  });

  parent.append(section);
};

export default createSignaturePlates;