
"use strict";

// DARK MODE
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
});

// SEARCH AND CATEGORY FILTER
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resourceCards = document.querySelectorAll(".resource-card");
const noResults = document.getElementById("noResults");

function filterResources() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    resourceCards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterResources);
categoryFilter.addEventListener("change", filterResources);

// RESOURCE DETAILS POPUP
const detailsDialog = document.getElementById("detailsDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const closeDialog = document.getElementById("closeDialog");
const dialogOk = document.getElementById("dialogOk");

const detailButtons = document.querySelectorAll(".detailsButton");

detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        dialogTitle.textContent = button.dataset.title;
        dialogDescription.textContent = button.dataset.description;

        detailsDialog.showModal();
    });
});

function closeDetails() {
    detailsDialog.close();
}

closeDialog.addEventListener("click", closeDetails);
dialogOk.addEventListener("click", closeDetails);

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.classList.add("error");
        return;
    }

    formMessage.textContent =
        "Dear, " + name + (". Thank you for connecting with Student Hub. We appreciate hearing from you!")

    formMessage.classList.remove("error");

    contactForm.reset();
});