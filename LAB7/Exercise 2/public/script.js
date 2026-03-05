const API = "http://localhost:3000/books";

async function displayBooks(url) {
    const res = await fetch(url);
    const books = await res.json();
    const list = document.getElementById('book-list');
    list.innerHTML = books.map(b => `
        <div class="book-card">
            <h4>${b.title}</h4>
            <p>Category: ${b.category} | Rating: ⭐${b.rating}</p>
            <p>Price: ₹${b.price}</p>
        </div>
    `).join('');
}

function searchTitle() {
    const query = document.getElementById('search').value;
    displayBooks(`${API}/search?title=${query}`);
}

function filterCategory(cat) {
    displayBooks(`${API}/category/${cat}`);
}

function sortBy(field) {
    displayBooks(`${API}/sort/${field}`);
}

function showTop() {
    displayBooks(`${API}/top`);
}

let currentPage = 1;
function loadMore() {
    currentPage++;
    displayBooks(`${API}?page=${currentPage}`);
}

displayBooks(API);