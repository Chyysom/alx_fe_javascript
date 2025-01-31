// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');

    quoteDisplay.innerHTML = `<p><strong>${quote.text}</strong></p><p><em>- ${quote.category}</em></p>`;
}

// Function to add a new quote to the array and the DOM
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Clear input fields after adding
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert("New quote added!");
    } else {
        alert("Please fill in both fields.");
    }
}

// Function to dynamically create the "Add Quote" form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    const inputText = document.createElement('input');
    const inputCategory = document.createElement('input');
    const addButton = document.createElement('button');

    inputText.id = 'newQuoteText';
    inputText.type = 'text';
    inputText.placeholder = 'Enter a new quote';

    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';

    addButton.innerText = 'Add Quote';
    addButton.onclick = addQuote;

    // Append inputs and button to the form container
    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    // Append the form container to the body
    document.body.appendChild(formContainer);
}

// Event listener to show a new random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the "Add Quote" form dynamically when the page loads
createAddQuoteForm();

// Initial display of a random quote when the page loads
showRandomQuote();

