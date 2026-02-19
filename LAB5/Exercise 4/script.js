let inventory = [];

//Fetch API
async function loadInventory() {
    try {
        const response = await fetch('./inventory.json');
        if (!response.ok) throw new Error("File not found");
        inventory = await response.json();
        displayInventory(inventory);
    } catch (err) {
        console.error("Load Error:", err);
    }
}

function displayInventory(data) {
    const table = document.getElementById("inventory");
    const totalValue = document.getElementById("totalValue");
    table.innerHTML = "";
    let total = 0;

    data.forEach((item, index) => {
        const itemTotal = item.price * item.stock;
        total += itemTotal;

        //low-stock warning
        const stockClass = item.stock < 3 ? "low-stock" : "";

        const row = `<tr class="${stockClass}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>₹${item.price}</td>
            <td>${item.stock} ${item.stock < 3 ? "<strong>(LOW)</strong>" : ""}</td>
            <td>
                <button onclick="editPrice(${index})">Adjust Price</button>
                <button onclick="editStock(${index})">Adjust Stock</button>
                <button onclick="deleteProduct(${index})">Remove</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });

    totalValue.innerText = `Total Inventory Value: ₹${total}`;
}

//search
function searchByCategory() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.category.toLowerCase().includes(query)
    );
    displayInventory(filtered);
}

//create
function addProduct() {
    const id = document.getElementById("pid").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!id || isNaN(price) || isNaN(stock)) {
        alert("Invalid input. Please check your price and stock numbers.");
        return;
    }

    inventory.push({
        id: id,
        name: document.getElementById("name").value,
        category: document.getElementById("cat").value,
        price: price,
        stock: stock
    });
    displayInventory(inventory);
}

//update
function editStock(index) {
    const newStock = prompt("Enter new stock quantity:", inventory[index].stock);
    if (newStock !== null && !isNaN(newStock)) {
        inventory[index].stock = parseInt(newStock);
        displayInventory(inventory);
    }
}

function editPrice(index) {
    const newPrice = prompt("Enter new price:", inventory[index].price);
    if (newPrice !== null && !isNaN(newPrice)) {
        inventory[index].price = parseFloat(newPrice);
        displayInventory(inventory);
    }
}

//delete
function deleteProduct(index) {
    inventory.splice(index, 1);
    displayInventory(inventory);
}

window.onload = loadInventory;