// Find all the cards on the page
const cards = document.querySelectorAll(".card");

// Tell us how many cards were found
console.log("Script loaded, cards found:", cards.length);

// Go through each card one by one
cards.forEach(card => {

    // Find the hidden text box inside the card
    const textBox = card.querySelector(".card-text");

    // Create a title and paragraph
    const title = document.createElement("h4");
    const desc = document.createElement("p");

    // Get the name and description from the card's data
    title.textContent = card.dataset.name;
    desc.textContent = card.dataset.desc;

    // Put the text inside the box
    textBox.appendChild(title);
    textBox.appendChild(desc);

    console.log("Card set up:", card.dataset.name);

    // When the mouse goes over the card, show the text
    card.addEventListener("mouseenter", () => {
        textBox.classList.remove("hidden");
    });

    // When the mouse leaves the card, hide the text
    card.addEventListener("mouseleave", () => {
        textBox.classList.add("hidden");
    });
});