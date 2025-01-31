// Simulate a conflict resolution strategy: server data takes precedence
function syncQuotesWithServer() {
    fetchQuotesFromServer()
        .then(quotesFromServer => {
            if (quotesFromServer.length === 0) {
                return;
            }

            // Compare and merge the local and server quotes
            quotes = mergeQuotes(quotes, quotesFromServer);

            // Save the updated quotes back to localStorage
            saveQuotes();
            alert('Quotes synchronized with server!');
        });
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

// Set up periodic sync every 30 seconds
setInterval(syncQuotesWithServer, 30000); // Fetch from the server every 30 seconds

// Call the sync function once on page load to ensure data is up-to-date
syncQuotesWithServer();

