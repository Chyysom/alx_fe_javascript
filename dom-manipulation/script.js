const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL for the mock API

// Use async/await for fetching quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const data = await response.json(); // Parse the JSON data
        const quotesFromServer = data.map(item => ({
            text: item.title, // Using title as quote text for this simulation
            category: item.userId.toString() // Mapping userId to categories
        }));
        return quotesFromServer;
    } catch (error) {
        console.error('Error fetching data from the server:', error);
        return [];
    }
}

// Use async/await for posting a new quote to the server
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });
        const data = await response.json();
        console.log('Posted data:', data);
    } catch (error) {
        console.error('Error posting data to the server:', error);
    }
}

// Simulate syncing the quotes with the server
async function syncQuotesWithServer() {
    const quotesFromServer = await fetchQuotesFromServer();
    if (quotesFromServer.length === 0) {
        showSyncNotification('Error fetching quotes from the server.');
        return;
    }

    // Compare and merge local and server quotes
    quotes = mergeQuotes(quotes, quotesFromServer);

    // Save the updated quotes back to localStorage
    saveQuotes();
    showSyncNotification('Quotes synchronized with the server!');
}

// Merge the local quotes with the server's quotes, preferring the server's data
function mergeQuotes(localQuotes, serverQuotes) {
    const mergedQuotes = [];

    // Create a map of the server quotes for fast lookup
    const serverQuoteMap = new Map(serverQuotes.map(quote => [quote.text, quote]));

    localQuotes.forEach(localQuote => {
        const serverQuote = serverQuoteMap.get(localQuote.text);

        if (serverQuote) {
            // If the quote exists on the server, we prefer the server's data
            mergedQuotes.push(serverQuote);
            serverQuoteMap.delete(localQuote.text); // Remove the matched server quote
        } else {
            // If the quote doesn't exist on the server, keep the local version
            mergedQuotes.push(localQuote);
        }
    });

    // Add any new quotes from the server that weren't in the local storage
    serverQuoteMap.forEach(serverQuote => {
        mergedQuotes.push(serverQuote);
    });

    return mergedQuotes;
}

// Notification system to show when quotes are synchronized
function showSyncNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'sync-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove the notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Set up periodic sync every 30 seconds
setInterval(syncQuotesWithServer, 30000); // Fetch from the server every 30 seconds

// Call the sync function once on page load to ensure data is up-to-date
syncQuotesWithServer();

