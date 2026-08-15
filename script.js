const cards = [...document.querySelectorAll(".card")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

let active = "all";

function update() {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesSearch =
      !query || card.textContent.toLowerCase().includes(query);

    const matchesFilter =
      active === "all" || card.dataset.category === active;

    const show = matchesSearch && matchesFilter;

    card.hidden = !show;

    if (show) {
      visibleCount++;
    }
  });

  empty.hidden = visibleCount !== 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(filter => filter.classList.remove("active"));

    button.classList.add("active");
    active = button.dataset.filter;

    update();
  });
});

search.addEventListener("input", update);


/* Copy buttons */

document.querySelectorAll(".copy").forEach(button => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);

      button.textContent = "Copied";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("copied");
      }, 1600);
    } catch {
      button.textContent = "Select";

      setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    }
  });
});


/* Installation guide modal */

const installModal = document.querySelector("#installModal");
const installTriggers = document.querySelectorAll(".install-trigger");
const installCloseButtons = document.querySelectorAll("[data-install-close]");

let lastFocusedElement = null;

function openInstallModal(event) {
  event.preventDefault();

  if (!installModal) {
    return;
  }

  lastFocusedElement = document.activeElement;

  installModal.classList.add("open");
  installModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("install-modal-open");

  installModal.querySelector(".modal-close")?.focus();
}

function closeInstallModal() {
  if (!installModal) {
    return;
  }

  installModal.classList.remove("open");
  installModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("install-modal-open");

  lastFocusedElement?.focus();
}

installTriggers.forEach(trigger => {
  trigger.addEventListener("click", openInstallModal);
});

installCloseButtons.forEach(button => {
  button.addEventListener("click", closeInstallModal);
});


/* Close modal with Escape */

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    installModal?.classList.contains("open")
  ) {
    closeInstallModal();
  }
});
