
// This function runs when the page is ready
function ready() {
    "use strict"; // This helps prevent mistakes in our code

    // Find all the "Add to Cart" buttons
    var addToCartButtons = document.getElementsByClassName('shop-item-button');

    // Go through each button and make it clickable
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addToCartClicked)
    }

    // Make the "Purchase" button clickable too
    document.getElementsByClassName('btn-purchase')[0]
        .addEventListener('click', purchaseClicked);
}

// Wait until the page is fully loaded, then run ready()
document.addEventListener('DOMContentLoaded', ready);


// This function removes an item from the cart
function removeCartItem(event) {
    // Delete the item from the page
    event.target.parentElement.parentElement.remove();

    // Update the total price
    updateCartTotal()
}


// This function runs when someone changes the quantity number
function quantityChanged(event) {
    var input = event.target; // The number box
    var value = parseInt(input.value); // Turn the text into a number

    // If the number is not real or less than 1, fix it to 1
    if (isNaN(value) || value < 1) {
        input.value = 1;
    } else {
        input.value = value;
    }

    // Update the total price
    updateCartTotal();
}


// This runs when someone clicks "Add to Cart"
function addToCartClicked(event) {
    var button = event.target; // The button clicked

    // Find the item card
    var shopItem = button.closest('.shop-item');

    // Get the item's name, price, and picture
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    // Check if this item is already in the cart
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (var i = 0; i < cartItemNames.length; i++) {

        // If the item is already there
        if (cartItemNames[i].innerText === title) {

            // Add 1 more instead of adding a new row
            var row = cartItemNames[i].closest('.cart-row');
            var input = row.getElementsByClassName('cart-quantity-input')[0];
            input.value = parseInt(input.value) + 1;

            updateCartTotal();
            return; // Stop here
        }
    }

    // If the item was not already there, add it
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}


// This runs when someone clicks the Purchase button
function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0];

    // If there is nothing in the cart
    if (!cartItems.hasChildNodes()) {
        alert('Your cart is empty!');
        return;
    }

    // Say thank you
    alert('Thank you for purchasing your tickets! Enjoy your visit to Farhan\'s ZOO!');

    // Remove everything from the cart
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    // Update the total price
    updateCartTotal()
}


// This function creates a new item inside the cart
function addItemToCart(title, price, imageSrc) {

    // Make a new box (div)
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    var cartItems = document.getElementsByClassName('cart-items')[0];

    // Add the item's picture, name, price, and buttons
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;

    // Put the new item into the cart
    cartItems.append(cartRow)

    // Make the Remove button work
    cartRow.getElementsByClassName('btn-danger')[0]
        .addEventListener('click', removeCartItem);

    // Make the number box work
    cartRow.getElementsByClassName('cart-quantity-input')[0]
        .addEventListener('change', quantityChanged);
}


// This function adds up all the prices
function updateCartTotal() {

    // Get all rows in the cart
    var cartRows = document.getElementsByClassName('cart-items')[0]
        .getElementsByClassName('cart-row')

    var total = 0; // Start at 0 dollars

    // Go through each item
    for (var i = 0; i < cartRows.length; i++) {

        var priceElement = cartRows[i].getElementsByClassName('cart-price')[0];
        var quantityInput = cartRows[i].getElementsByClassName('cart-quantity-input')[0];

        // Get the price and remove the $ sign
        var price = parseFloat(priceElement.innerText.replace('$', ''));

        // Get how many of the item
        var quantity = parseInt(quantityInput.value);

        // If both numbers are real numbers
        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity; // Multiply and add to total
        }
    }

    // Show the final total with 2 decimal places
    document.getElementsByClassName('cart-total-price')[0]
        .innerText = '$' + total.toFixed(2);
}