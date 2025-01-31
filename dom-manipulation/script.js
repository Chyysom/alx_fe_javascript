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

