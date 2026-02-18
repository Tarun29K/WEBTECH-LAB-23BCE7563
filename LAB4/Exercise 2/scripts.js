const search = document.getElementById('search');
const results = document.getElementById('results');

let debounceTimer;

//Debouncer
search.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    results.innerHTML = '<p class="status">Searching products...</p>';
    clearTimeout(debounceTimer);

    if (!query) {
        results.innerHTML = "";
        return;
    }

    debounceTimer = setTimeout(() => {
        performSearch(query);
    }, 500);
});

//AJAX
function performSearch(query) {
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './products.json', true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
                try {
                    const products = JSON.parse(xhttp.responseText);
                    
                    const filtered = products.filter(item => 
                        item.name.toLowerCase().includes(query) || 
                        item.category.toLowerCase().includes(query)
                    );

                    renderResults(filtered);
                } catch (e) {
                    showError("Failed to parse product data.");
                }
            } else {
                showError("Error: Could not reach the server.");
            }
        
    };

    xhttp.send();
}

function renderResults(products) {
    results.innerHTML = "";

    if (products.length === 0) {
        results.innerHTML = '<p class="status">No results found.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="product-name">${product.name}</span>
            <div class="product-info">
                Category: <span>${product.category}</span> | 
                Price: <span class="price">₹${product.price}</span>
            </div>
        `;
        results.appendChild(card);
    });
}

//error-handling
function showError(message) {
    results.textContent = message;
}