import "./contact.css";

const contact = (outlet) => {
  const page = document.createElement("section");

  page.classList.add("contact-page");

  page.innerHTML = `
    <div class="contact-header">

      <p class="section-eyebrow">
        Your Evening Awaits
      </p>

      <h1>
        Meet us
        after dark.
      </h1>

      <p>
        Come for dinner. Stay for the atmosphere.
      </p>

    </div>


    <div class="contact-layout">

      <div class="contact-image">

        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Warmly lit restaurant dining room"
        />

      </div>


      <div class="reservation-panel">

        <p class="contact-label">
          Reserve a table
        </p>

        <h2>
          Make an evening
          of it.
        </h2>

        <form class="reservation-form">

          <div class="form-group">
            <label for="guest-name">
              Your name
            </label>

            <input
              id="guest-name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>


          <div class="form-row">

            <div class="form-group">
              <label for="reservation-date">
                Date
              </label>

              <input
                id="reservation-date"
                type="date"
                required
              />
            </div>


            <div class="form-group">
              <label for="reservation-time">
                Time
              </label>

              <input
                id="reservation-time"
                type="time"
                required
              />
            </div>

          </div>


          <div class="form-group">

            <label for="guests">
              Guests
            </label>

            <select id="guests">

              <option value="2">
                2 guests
              </option>

              <option value="3">
                3 guests
              </option>

              <option value="4">
                4 guests
              </option>

              <option value="5">
                5 guests
              </option>

              <option value="6">
                6 guests
              </option>

            </select>

          </div>


          <button
            type="submit"
            class="reservation-submit"
          >
            Request a table
            <span>→</span>
          </button>

        </form>

      </div>

    </div>


    <div class="contact-details">

      <div>
        <span>Visit</span>
        <p>14 Ember Lane, Lagos</p>
      </div>

      <div>
        <span>Call</span>
        <p>+234 800 000 0000</p>
      </div>

      <div>
        <span>Hours</span>
        <p>Tue — Sun · 5PM — 12AM</p>
      </div>

    </div>
  `;


  const form =
    page.querySelector(".reservation-form");


  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const submitButton =
      form.querySelector(".reservation-submit");

    submitButton.textContent =
      "Request received ✓";

    submitButton.disabled = true;

  });


  outlet.append(page);
};

export default contact;