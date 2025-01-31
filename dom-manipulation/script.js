// Array to store quotes
let quotes = [];

// Function to load quotes from localStorage
function loadQuotes() {
    const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (savedQuotes) {
        quotes = savedQuotes;
    }
}

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');

    quoteDisplay.innerHTML = `<p><strong>${quote.text}</strong></p><p><em>- ${quote.category}</em></p>`;

    // Save the last viewed quote in sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to add a new quote to the array and the DOM
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Save to localStorage
        saveQuotes();

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

// Function to export quotes as a JSON file
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener to show a new random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the "Add Quote" form dynamically when the page loads
createAddQuoteForm();

// Load quotes from localStorage and show a random quote on page load
loadQuotes();
showRandomQuote();

// Add Export and Import functionality on page
const exportButton = document.createElement('button');
exportButton.innerText = 'Export Quotes as JSON';
exportButton.onclick = exportToJson;
document.body.appendChild(exportButton);

const importInput = document.createElement('input');
importInput.type = 'file';
importInput.accept = '.json';
importInput.onchange = importFromJsonFile;
document.body.appendChild(importInput);
