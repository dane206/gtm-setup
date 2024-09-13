// Check if we are on the post-purchase upsell page
if (window.location.pathname.includes('/post-purchase')) {
    window.dataLayer = window.dataLayer || [];

    // Function to extract upsell product data from the page
    function getUpsellProductData() {
        // Assuming there are HTML elements with product data in data attributes
        const productElement = document.querySelector('.upsell-product'); // Update this selector based on your page structure
        if (productElement) {
            return {
                id: productElement.getAttribute('data-product-id'),
                name: productElement.getAttribute('data-product-name'),
                price: parseFloat(productElement.getAttribute('data-product-price')), // Convert to float for precision
                category: productElement.getAttribute('data-product-category') || 'Upsell'
            };
        }
        return null; // Return null if no product data is found
    }

    // Event: User views upsell offer
    function trackUpsellView(upsellProduct) {
        window.dataLayer.push({
            'event': 'upsell_view',
            'ecommerce': {
                'items': [{
                    'item_id': upsellProduct.id,
                    'item_name': upsellProduct.name,
                    'price': upsellProduct.price,
                    'category': upsellProduct.category,
                    'currency': 'USD' // Adjust if needed
                }]
            }
        });
        console.log('Upsell view tracked:', upsellProduct.name);
    }

    // Event: User clicks on upsell product
    function trackUpsellClick(upsellProduct) {
        window.dataLayer.push({
            'event': 'upsell_click',
            'ecommerce': {
                'items': [{
                    'item_id': upsellProduct.id,
                    'item_name': upsellProduct.name,
                    'price': upsellProduct.price,
                    'category': upsellProduct.category,
                    'currency': 'USD' // Adjust if needed
                }]
            }
        });
        console.log('Upsell click tracked:', upsellProduct.name);
    }

    // Event: User purchases upsell product
    function trackUpsellPurchase(upsellProduct) {
        window.dataLayer.push({
            'event': 'upsell_purchase',
            'ecommerce': {
                'transaction_id': 'T12345', // Replace with actual transaction ID
                'value': upsellProduct.price,
                'currency': 'USD', // Adjust currency if needed
                'items': [{
                    'item_id': upsellProduct.id,
                    'item_name': upsellProduct.name,
                    'price': upsellProduct.price,
                    'category': upsellProduct.category
                }]
            }
        });
        console.log('Upsell purchase tracked:', upsellProduct.name);
    }

    // Extract product data dynamically
    const upsellProduct = getUpsellProductData();

    if (upsellProduct) {
        // Call these functions based on user actions on the post-purchase upsell page
        trackUpsellView(upsellProduct); // Track when the user views the upsell product
        // Add additional logic to track upsell clicks and purchases as needed
        // trackUpsellClick(upsellProduct);
        // trackUpsellPurchase(upsellProduct);
    } else {
        console.error('Upsell product data not found on the page.');
    }
}
