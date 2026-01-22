
let cart = [];
let appliedCoupon = null;

const productSelect = document.getElementById('productSelect');
const addBtn = document.getElementById('addBtn');
const cartTableBody = document.getElementById('cartTableBody');

addBtn.addEventListener('click', function() {
    const name = productSelect.value;
    const option = productSelect.options[productSelect.selectedIndex];
    const price = parseFloat(option.getAttribute('price'));
    const category = option.getAttribute('category');

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
});

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
}

//coupons
document.getElementById('applyCoupon').addEventListener('click', function() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMsg');

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

function renderCart() {
    cartTableBody.innerHTML = "";
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        //bulk discount
        if (item.quantity > 5) {
            totalDiscount += itemTotal * 0.10;
        }

        //category discount
        if (appliedCoupon && appliedCoupon.endsWith(item.category.substring(0, 4).toUpperCase())) {
            totalDiscount += itemTotal * 0.15;
        }

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

    //time based discount
    const hour = new Date().getHours();
    if (hour === 17) {
        totalDiscount += (subtotal - totalDiscount) * 0.05;
    }

    //total amounts
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('discount').textContent = totalDiscount.toFixed(2);
    document.getElementById('finalTotal').textContent = (subtotal - totalDiscount).toFixed(2);
}