// Array to store quotes
let quotes = [];

// Load quotes from localStorage and populate categories
function loadQuotes() {
    const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (savedQuotes) {
        quotes = savedQuotes;
    }
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load the last selected category filter from localStorage
function loadCategoryFilter() {
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes(lastCategory); // Apply filter based on saved category
}

// Populate the categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = ['all', ...quotes.map(quote => quote.category)]; // Using map to get categories

    // Remove duplicates using Set
    const uniqueCategories = [...new Set(categories)];

    // Clear existing options
    categoryFilter.innerHTML = '';

    // Add the "all" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);

    // Add category options
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// **filterQuotes** function: Filter quotes based on the selected category
function filterQuotes(selectedCategory = 'all') {
    // Save the selected category to localStorage
    localStorage.setItem('lastCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    displayQuotes(filteredQuotes);
}

// Display quotes in the DOM
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `<p><strong>${quote.text}</strong></p><p><em>- ${quote.category}</em></p>`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// **showRandomQuote** function: Display a random quote using Math.random
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Using Math.random to get a random index
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong></p><p><em>- ${randomQuote.category}</em></p>`;
}

// Add a new quote to the array and the DOM
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Save quotes to localStorage
        saveQuotes();

        // Update the categories dropdown and the filter
        populateCategories();
        filterQuotes(); // Apply the current category filter after adding the quote

        // Clear input fields after adding
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert("New quote added!");
    } else {
        alert("Please fill in both fields.");
    }
}

// Export quotes as a JSON file
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

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes(); // Apply current category filter after import
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJson);

// Load quotes, categories, and selected filter when the page loads
loadQuotes();
populateCategories();
loadCategoryFilter();

// Display quotes based on selected filter
filterQuotes(); // Display quotes based on the last selected category


