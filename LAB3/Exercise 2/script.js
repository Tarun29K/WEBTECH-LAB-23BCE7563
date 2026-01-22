
let cart = [];
let appliedCoupon = null;

const productSelect = document.getElementById('productSelect');
const addBtn = document.getElementById('addBtn');
const cartTableBody = document.getElementById('cartTableBody');

// 2. Add Item Function (Requirement 2)
addBtn.addEventListener('click', function() {
    const name = productSelect.value;
    const option = productSelect.options[productSelect.selectedIndex];
    const price = parseFloat(option.getAttribute('price'));
    const category = option.getAttribute('category');

    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
});

// 3. Remove Item Function
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// 4. Update Quantity
function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
}

// 5. Coupon Logic (Requirement 4)
document.getElementById('applyCoupon').addEventListener('click', function() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMsg');

    // Requirement 4: String methods to parse code (Format: NAME-CATEGORY)
    if (code.startsWith("SAVE") && code.includes("-")) {
        appliedCoupon = code;
        msg.textContent = "Coupon Applied!";
        msg.style.color = "green";
    } else {
        appliedCoupon = null;
        msg.textContent = "Invalid Code";
        msg.style.color = "red";
    }
    renderCart();
});

// 6. Calculate and Display (Requirement 3, 5, 6)
function renderCart() {
    cartTableBody.innerHTML = "";
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Requirement 3: Bulk Discount (10% off if quantity > 5)
        if (item.quantity > 5) {
            totalDiscount += itemTotal * 0.10;
        }

        // Requirement 3 & 4: Category-based Coupon Discount
        if (appliedCoupon && appliedCoupon.endsWith(item.category.substring(0, 4).toUpperCase())) {
            totalDiscount += itemTotal * 0.15; // 15% off specific category
        }

        // Build Table Row
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price}</td>
            <td>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQty(${index}, 1)">+</button>
            </td>
            <td>$${itemTotal}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        </tr>`;
        cartTableBody.innerHTML += row;
    });

    // Requirement 3: Time-based Discount (e.g., Happy Hour 5pm-6pm)
    const hour = new Date().getHours();
    if (hour === 17) {
        totalDiscount += (subtotal - totalDiscount) * 0.05;
    }

    // Update Totals in DOM
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('discount').textContent = totalDiscount.toFixed(2);
    document.getElementById('finalTotal').textContent = (subtotal - totalDiscount).toFixed(2);
}