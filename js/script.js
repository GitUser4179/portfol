// Select elements
const buttons = document.querySelectorAll(".info-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");

// Only run code on pages with modals
if (modal && closeBtn) {

    // Open modal
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            modalTitle.textContent = button.dataset.title;
            modalDescription.textContent = button.dataset.description;
            modal.classList.remove("hidden");
        });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

}

// Easter egg 1, click the footer to toggle. Persists between refreshes
const footer = document.querySelector("footer");

if (localStorage.getItem("easterTheme") === "enabled"){
    document.documentElement.classList.add("easter-theme");
}

footer.addEventListener("click", () => {
    document.documentElement.classList.toggle("easter-theme");

    // Saves the state
    if (document.documentElement.classList.contains("easter-theme")){
        localStorage.setItem("easterTheme", "enabled");
    } else {
        localStorage.removeItem("easterTheme");
    }
});

// Easter egg 2, type 1337
let typedKeys = "";

document.addEventListener("keydown", (e) => {
    typedKeys += e.key;

    typedKeys = typedKeys.slice(-4);

    if (typedKeys === "1337") {
        modalTitle.textContent = "Oh, what a coincidence."
        modalDescription.textContent = "Who told you about typing those combinations on this site? How peculiar."
        modal.classList.remove("hidden");
    }
});

// Print button
const printBtn = document.getElementById("print-cv-btn");

if (printBtn) {
    printBtn.addEventListener("click", () => {
        window.print();
    });
}