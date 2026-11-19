/**
 * SAWERA & MEHWISH - RESTAURANT E-COMMERCE CORE APPLICATION
 * Authentic Dining & Online Food Ordering System
 */

const app = (function () {
    'use strict';

    // --- State Variables ---
    let dishes = [];
    let cart = [];
    let activeCategory = 'all';
    let searchQuery = '';
    let appliedPromo = null; // { code: 'WELCOME10', percent: 10 }
    const DELIVERY_FEE = 150;
    const FREE_DELIVERY_THRESHOLD = 3500;

    // --- DOM Elements Cache ---
    let el = {};

    // --- Product Catalog (Dishes) ---
    const menuCatalog = [
        {
            id: 'sm-01',
            name: 'Royal Mutton Shinwari Karahi',
            category: 'karahi',
            price: 2450,
            description: 'Cooked traditionally in pure mutton animal fat, fresh tomatoes, green chilies, and black pepper. No heavy onions or artificial spices.',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: true, isVeg: false, isBestSeller: true, isChefSpecial: true },
            portion: 'Half / Full Handi (Serves 2-3)',
            rating: 4.9
        },
        {
            id: 'sm-02',
            name: 'Chicken Dum Biryani (Shahi Special)',
            category: 'rice',
            price: 850,
            description: 'Aged long-grain basmati layered with tender chicken pieces, saffron milk, caramelized onions, and whole aromatic whole spices.',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: true, isVeg: false, isBestSeller: true, isChefSpecial: true },
            portion: 'Double Platter with Raita',
            rating: 5.0
        },
        {
            id: 'sm-03',
            name: 'Reshmi Chicken Malai Boti',
            category: 'bbq',
            price: 1190,
            description: 'Boneless chicken cubes marinated overnight in heavy dairy cream, cashew paste, mild white pepper, and grilled to melt-in-the-mouth perfection.',
            image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: false, isBestSeller: true, isChefSpecial: true },
            portion: '8 Skewered Tender Cuts',
            rating: 4.9
        },
        {
            id: 'sm-04',
            name: 'Mughlai Chicken Handi Boneless',
            category: 'karahi',
            price: 1850,
            description: 'Silky, velvety golden gravy infused with cream, butter, roasted cumin, and toasted almonds served in a sizzling clay pot.',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: false, isBestSeller: true, isChefSpecial: false },
            portion: 'Serves 2-3 Persons',
            rating: 4.8
        },
        {
            id: 'sm-05',
            name: 'Charcoal Grilled Seekh Kebab Platter',
            category: 'bbq',
            price: 1250,
            description: 'Finely minced beef infused with coriander, pomegranate seeds, and secret herbs skewered over natural flaming charcoal embers.',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: true, isVeg: false, isBestSeller: true, isChefSpecial: false },
            portion: '4 Large Juicy Kebabs with Chutney',
            rating: 4.8
        },
        {
            id: 'sm-06',
            name: 'Crispy Dahi Puri Chaat & Samosa',
            category: 'starters',
            price: 520,
            description: 'Handmade crisp puries filled with spiced chickpeas, potatoes, sweet tamarind chutney, and chilled whipped yogurt.',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: false, isChefSpecial: false },
            portion: '6 Pcs Platter',
            rating: 4.7
        },
        {
            id: 'sm-07',
            name: 'Chicken Cheese Boti Roll',
            category: 'starters',
            price: 490,
            description: 'Paratha rolled with charcoal-grilled spicy chicken boti, melted cheddar mozzarella blend, garlic mayo, and pickled onion rings.',
            image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: true, isVeg: false, isBestSeller: true, isChefSpecial: false },
            portion: '1 Large Gourmet Roll',
            rating: 4.8
        },
        {
            id: 'sm-08',
            name: 'Royal Shahi Paneer Makhani',
            category: 'karahi',
            price: 1150,
            description: 'Cottage cheese cubes simmered in a silky tomato, cashew and dairy butter gravy, garnished with dried fenugreek leaves (Kasuri Methi).',
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: false, isChefSpecial: false },
            portion: 'Serves 2 Persons',
            rating: 4.7
        },
        {
            id: 'sm-09',
            name: 'Garlic Roghani Tandoori Naan',
            category: 'rice',
            price: 180,
            description: 'Puffy tandoor-baked leavened bread brushed with clarified desi ghee, minced roasted garlic, and toasted white sesame seeds.',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: true, isChefSpecial: false },
            portion: '1 Fresh Hot Naan',
            rating: 4.9
        },
        {
            id: 'sm-10',
            name: 'Traditional Peshawari Kabab',
            category: 'bbq',
            price: 1350,
            description: 'Flat, disc-shaped pan-fried ground beef patties with crushed pomegranate seeds, fresh coriander, ginger, and diced tomatoes.',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: true, isVeg: false, isBestSeller: false, isChefSpecial: true },
            portion: '3 Giant Peshawari Chapli Patties',
            rating: 4.9
        },
        {
            id: 'sm-11',
            name: 'Shahi Matka Kheer & Gulab Jamun',
            category: 'desserts',
            price: 480,
            description: 'Slow-cooked milk pudding in traditional unglazed terracotta clay pots, topped with saffron threads, pistachios, and silver leaf (Warq).',
            image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: true, isChefSpecial: true },
            portion: '1 Earthen Pot (Serves 1-2)',
            rating: 5.0
        },
        {
            id: 'sm-12',
            name: 'Royal Zafrani Kulfi Falooda',
            category: 'desserts',
            price: 550,
            description: 'Thick condensed milk kulfi served with vermicelli, basil seeds (tukh malanga), rose syrup, and crushed almonds.',
            image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: false, isChefSpecial: false },
            portion: '1 Tall Glass Deluxe',
            rating: 4.9
        },
        {
            id: 'sm-13',
            name: 'Fresh Mint Lemonade Margarita',
            category: 'drinks',
            price: 360,
            description: 'Crushed garden fresh mint leaves blended with fresh lime juice, black salt, sparkling soda, and ice.',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: true, isChefSpecial: false },
            portion: 'Chilled Large Mason Jar',
            rating: 4.9
        },
        {
            id: 'sm-14',
            name: 'Karak Doodh Patti Zafrani Chai',
            category: 'drinks',
            price: 220,
            description: 'Pure whole buffalo milk boiled with fine tea leaves, green cardamom pods, and a pinch of Kashmiri saffron.',
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
            tags: { isSpicy: false, isVeg: true, isBestSeller: false, isChefSpecial: false },
            portion: 'Traditional Clay Cup',
            rating: 4.8
        }
    ];

    // --- Initialization ---
    function init() {
        cacheDOM();
        loadCartFromStorage();
        bindEvents();
        renderSpecials();
        renderDishes();
        updateCartUI();
    }

    // --- Cache DOM elements ---
    function cacheDOM() {
        el.header = document.getElementById('header');
        el.navMenu = document.getElementById('navMenu');
        el.menuToggle = document.getElementById('menuToggle');
        
        el.searchBtn = document.getElementById('searchBtn');
        el.searchOverlay = document.getElementById('searchOverlay');
        el.menuSearchInput = document.getElementById('menuSearchInput');
        el.closeSearchBtn = document.getElementById('closeSearchBtn');

        el.specialsContainer = document.getElementById('specialsContainer');
        el.dishesContainer = document.getElementById('dishesContainer');
        el.categoryTabs = document.getElementById('categoryTabs');
        el.dishCountDisplay = document.getElementById('dishCountDisplay');
        el.noDishesState = document.getElementById('noDishesState');
        el.resetFiltersBtn = document.getElementById('resetFiltersBtn');

        // Checkbox filters
        el.filterSpicyOnly = document.getElementById('filterSpicyOnly');
        el.filterVegOnly = document.getElementById('filterVegOnly');
        el.filterBestSellerOnly = document.getElementById('filterBestSellerOnly');

        // Cart Drawer
        el.openCartBtn = document.getElementById('openCartBtn');
        el.closeCartBtn = document.getElementById('closeCartBtn');
        el.cartOverlay = document.getElementById('cartOverlay');
        el.cartDrawer = document.getElementById('cartDrawer');
        el.cartBadge = document.getElementById('cartBadge');
        el.cartBtnTotal = document.getElementById('cartBtnTotal');
        el.cartDrawerCount = document.getElementById('cartDrawerCount');
        el.cartItemsContainer = document.getElementById('cartItemsContainer');
        el.cartFooter = document.getElementById('cartFooter');
        el.cartSubtotal = document.getElementById('cartSubtotal');
        el.cartDiscount = document.getElementById('cartDiscount');
        el.discountRow = document.getElementById('discountRow');
        el.cartDelivery = document.getElementById('cartDelivery');
        el.cartGrandTotal = document.getElementById('cartGrandTotal');
        el.clearCartBtn = document.getElementById('clearCartBtn');
        el.proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

        // Promo
        el.promoInput = document.getElementById('promoInput');
        el.applyPromoBtn = document.getElementById('applyPromoBtn');
        el.promoFeedback = document.getElementById('promoFeedback');

        // Checkout Modal
        el.checkoutModal = document.getElementById('checkoutModal');
        el.closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
        el.checkoutForm = document.getElementById('checkoutForm');
        el.modalSummaryItems = document.getElementById('modalSummaryItems');
        el.modalSummaryTotal = document.getElementById('modalSummaryTotal');
        el.deliveryAddressGroup = document.getElementById('deliveryAddressGroup');

        // Success Modal
        el.orderSuccessModal = document.getElementById('orderSuccessModal');
        el.orderReceiptBox = document.getElementById('orderReceiptBox');

        // Toast container
        el.toastContainer = document.getElementById('toastContainer');
    }

    // --- Event Bindings ---
    function bindEvents() {
        // Sticky Header scroll
        window.addEventListener('scroll', handleWindowScroll);

        // Mobile Nav
        if (el.menuToggle) {
            el.menuToggle.addEventListener('click', () => {
                el.navMenu.classList.toggle('active');
            });
        }

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (el.navMenu) el.navMenu.classList.remove('active');
            });
        });

        // Search Bar Toggle
        if (el.searchBtn) {
            el.searchBtn.addEventListener('click', toggleSearchOverlay);
        }
        if (el.closeSearchBtn) {
            el.closeSearchBtn.addEventListener('click', closeSearchOverlay);
        }
        if (el.menuSearchInput) {
            el.menuSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                renderDishes();
            });
        }

        // Category Tabs click
        if (el.categoryTabs) {
            el.categoryTabs.addEventListener('click', (e) => {
                const button = e.target.closest('.cat-tab');
                if (!button) return;
                document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                activeCategory = button.getAttribute('data-category');
                renderDishes();
            });
        }

        // Checkbox filters
        [el.filterSpicyOnly, el.filterVegOnly, el.filterBestSellerOnly].forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', renderDishes);
            }
        });

        if (el.resetFiltersBtn) {
            el.resetFiltersBtn.addEventListener('click', resetAllFilters);
        }

        // Cart Drawer open / close
        if (el.openCartBtn) el.openCartBtn.addEventListener('click', openCartDrawer);
        if (el.closeCartBtn) el.closeCartBtn.addEventListener('click', closeCartDrawer);
        if (el.cartOverlay) el.cartOverlay.addEventListener('click', closeCartDrawer);

        // Cart Actions
        if (el.clearCartBtn) el.clearCartBtn.addEventListener('click', clearCart);
        if (el.applyPromoBtn) el.applyPromoBtn.addEventListener('click', handlePromoApply);
        if (el.proceedCheckoutBtn) el.proceedCheckoutBtn.addEventListener('click', openCheckoutModal);

        // Checkout Modal Close
        if (el.closeCheckoutBtn) {
            el.closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
        }
    }

    // --- Header & Scroll Logic ---
    function handleWindowScroll() {
        if (window.scrollY > 50) {
            el.header.classList.add('scrolled');
        } else {
            el.header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    function toggleSearchOverlay() {
        el.searchOverlay.classList.toggle('active');
        if (el.searchOverlay.classList.contains('active')) {
            el.menuSearchInput.focus();
        }
    }

    function closeSearchOverlay() {
        el.searchOverlay.classList.remove('active');
        searchQuery = '';
        el.menuSearchInput.value = '';
        renderDishes();
    }

    // --- Render Specials Section ---
    function renderSpecials() {
        if (!el.specialsContainer) return;
        const specials = menuCatalog.filter(d => d.tags.isChefSpecial);

        el.specialsContainer.innerHTML = specials.map(dish => `
            <article class="special-card">
                <span class="special-badge"><i class="fa-solid fa-crown"></i> Chef's Signature</span>
                <div class="special-img-wrapper">
                    <img src="${dish.image}" alt="${dish.name}" class="special-img" loading="lazy">
                </div>
                <div class="special-details">
                    <div class="special-header">
                        <h3 class="special-title">${dish.name}</h3>
                        <span class="special-price">Rs. ${dish.price.toLocaleString()}</span>
                    </div>
                    <p class="special-desc">${dish.description}</p>
                    <div class="special-footer">
                        <div class="special-rating">
                            <i class="fa-solid fa-star"></i>
                            <strong>${dish.rating}</strong> (150+ reviews)
                        </div>
                        <button class="btn btn-accent btn-sm" onclick="app.addToCart('${dish.id}')">
                            <i class="fa-solid fa-cart-plus"></i> Add to Order
                        </button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // --- Filter & Render Full Menu ---
    function renderDishes() {
        if (!el.dishesContainer) return;

        const isSpicy = el.filterSpicyOnly && el.filterSpicyOnly.checked;
        const isVeg = el.filterVegOnly && el.filterVegOnly.checked;
        const isBestSeller = el.filterBestSellerOnly && el.filterBestSellerOnly.checked;

        const filtered = menuCatalog.filter(dish => {
            // Category match
            const matchesCategory = (activeCategory === 'all') || (dish.category === activeCategory);

            // Search query match
            const matchesSearch = !searchQuery || 
                dish.name.toLowerCase().includes(searchQuery) || 
                dish.description.toLowerCase().includes(searchQuery) ||
                dish.category.toLowerCase().includes(searchQuery);

            // Feature filter matches
            const matchesSpicy = !isSpicy || dish.tags.isSpicy;
            const matchesVeg = !isVeg || dish.tags.isVeg;
            const matchesBestSeller = !isBestSeller || dish.tags.isBestSeller;

            return matchesCategory && matchesSearch && matchesSpicy && matchesVeg && matchesBestSeller;
        });

        // Update count
        if (el.dishCountDisplay) {
            el.dishCountDisplay.textContent = filtered.length;
        }

        // Empty state handling
        if (filtered.length === 0) {
            el.dishesContainer.innerHTML = '';
            el.noDishesState.style.display = 'block';
            return;
        } else {
            el.noDishesState.style.display = 'none';
        }

        // Render Cards
        el.dishesContainer.innerHTML = filtered.map(dish => {
            let tagBadge = '';
            if (dish.tags.isChefSpecial) {
                tagBadge = `<span class="dish-tag tag-chef"><i class="fa-solid fa-crown"></i> Chef Special</span>`;
            } else if (dish.tags.isBestSeller) {
                tagBadge = `<span class="dish-tag tag-bestseller"><i class="fa-solid fa-fire"></i> Best Seller</span>`;
            } else if (dish.tags.isVeg) {
                tagBadge = `<span class="dish-tag tag-veg"><i class="fa-solid fa-leaf"></i> Vegetarian</span>`;
            } else if (dish.tags.isSpicy) {
                tagBadge = `<span class="dish-tag tag-spicy"><i class="fa-solid fa-pepper-hot"></i> Spicy</span>`;
            }

            return `
                <div class="dish-card">
                    <div class="dish-image-box">
                        <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
                        ${tagBadge}
                    </div>
                    <div class="dish-content">
                        <div class="dish-header-row">
                            <h3 class="dish-title">${dish.name}</h3>
                            <span class="dish-price">Rs. ${dish.price.toLocaleString()}</span>
                        </div>
                        <p class="dish-description">${dish.description}</p>
                        <div class="dish-action-row">
                            <span class="dish-portion">
                                <i class="fa-solid fa-utensils"></i> ${dish.portion}
                            </span>
                            <button class="btn btn-primary btn-sm" onclick="app.addToCart('${dish.id}')">
                                <i class="fa-solid fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function resetAllFilters() {
        activeCategory = 'all';
        searchQuery = '';
        if (el.menuSearchInput) el.menuSearchInput.value = '';
        if (el.filterSpicyOnly) el.filterSpicyOnly.checked = false;
        if (el.filterVegOnly) el.filterVegOnly.checked = false;
        if (el.filterBestSellerOnly) el.filterBestSellerOnly.checked = false;
        
        document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
        const allTab = document.querySelector('.cat-tab[data-category="all"]');
        if (allTab) allTab.classList.add('active');

        renderDishes();
        showToast('All filters have been reset', 'info');
    }

    // --- Shopping Cart Operations ---
    function addToCart(dishId, quantity = 1) {
        const dish = menuCatalog.find(d => d.id === dishId);
        if (!dish) return;

        const existingItem = cart.find(item => item.id === dishId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                quantity: quantity
            });
        }

        saveCartToStorage();
        updateCartUI();
        showToast(`Added "${dish.name}" to your basket!`, 'success');
        openCartDrawer();
    }

    function addDealToCart() {
        const dealId = 'sm-deal-feast';
        const existingItem = cart.find(item => item.id === dealId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: dealId,
                name: 'Royal Family Feast Platter',
                price: 4999,
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80',
                quantity: 1
            });
        }

        saveCartToStorage();
        updateCartUI();
        showToast('Royal Family Feast Deal added to your cart!', 'success');
        openCartDrawer();
    }

    function updateCartQuantity(dishId, delta) {
        const item = cart.find(i => i.id === dishId);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(dishId);
            return;
        }

        saveCartToStorage();
        updateCartUI();
    }

    function removeFromCart(dishId) {
        const item = cart.find(i => i.id === dishId);
        const name = item ? item.name : 'Item';
        cart = cart.filter(i => i.id !== dishId);
        saveCartToStorage();
        updateCartUI();
        showToast(`Removed "${name}" from basket`, 'info');
    }

    function clearCart() {
        if (cart.length === 0) return;
        if (confirm('Are you sure you want to empty your entire food basket?')) {
            cart = [];
            appliedPromo = null;
            saveCartToStorage();
            updateCartUI();
            showToast('Your basket has been cleared', 'info');
        }
    }

    // --- Calculation & UI Updates ---
    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;

        if (appliedPromo) {
            discount = Math.round((subtotal * appliedPromo.percent) / 100);
        }

        const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
        const delivery = isFreeDelivery ? 0 : DELIVERY_FEE;
        const grandTotal = Math.max(0, subtotal - discount + delivery);

        return {
            subtotal,
            discount,
            delivery,
            grandTotal,
            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
        };
    }

    function updateCartUI() {
        const totals = calculateTotals();

        // Header controls
        if (el.cartBadge) el.cartBadge.textContent = totals.totalItems;
        if (el.cartBtnTotal) el.cartBtnTotal.textContent = `Rs. ${totals.subtotal.toLocaleString()}`;
        if (el.cartDrawerCount) el.cartDrawerCount.textContent = `${totals.totalItems} items`;

        // Cart Drawer Body
        if (cart.length === 0) {
            el.cartItemsContainer.innerHTML = `
                <div class="cart-empty-box">
                    <i class="fa-solid fa-utensils"></i>
                    <h4>Your Food Basket is Empty</h4>
                    <p>Select delicious royal delicacies from our menu to start your order.</p>
                    <a href="#menu" class="btn btn-primary btn-sm" onclick="app.closeCartDrawer()">
                        Browse Menu
                    </a>
                </div>
            `;
            if (el.cartFooter) el.cartFooter.style.display = 'none';
            return;
        }

        if (el.cartFooter) el.cartFooter.style.display = 'block';

        el.cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', -1)" title="Decrease">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', 1)" title="Increase">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="app.removeFromCart('${item.id}')" title="Remove item">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `).join('');

        // Summary calculations
        if (el.cartSubtotal) el.cartSubtotal.textContent = `Rs. ${totals.subtotal.toLocaleString()}`;
        
        if (totals.discount > 0) {
            el.discountRow.style.display = 'flex';
            el.cartDiscount.textContent = `- Rs. ${totals.discount.toLocaleString()} (${appliedPromo.code})`;
        } else {
            el.discountRow.style.display = 'none';
        }

        if (el.cartDelivery) {
            el.cartDelivery.textContent = totals.delivery === 0 ? 'FREE (Special Order)' : `Rs. ${totals.delivery}`;
        }

        if (el.cartGrandTotal) {
            el.cartGrandTotal.textContent = `Rs. ${totals.grandTotal.toLocaleString()}`;
        }
    }

    // --- Promo Code System ---
    function handlePromoApply() {
        const code = el.promoInput.value.trim().toUpperCase();
        if (!code) {
            showPromoFeedback('Please enter a coupon code', 'error');
            return;
        }

        if (code === 'WELCOME10') {
            appliedPromo = { code: 'WELCOME10', percent: 10 };
            showPromoFeedback('10% discount coupon applied successfully!', 'success');
            showToast('Coupon WELCOME10 applied (10% OFF)!', 'success');
            updateCartUI();
        } else if (code === 'SAWERA15') {
            appliedPromo = { code: 'SAWERA15', percent: 15 };
            showPromoFeedback('Special 15% VIP discount applied!', 'success');
            showToast('VIP Coupon SAWERA15 applied (15% OFF)!', 'success');
            updateCartUI();
        } else {
            showPromoFeedback('Invalid or expired coupon code. Try WELCOME10', 'error');
        }
    }

    function showPromoFeedback(msg, type) {
        if (!el.promoFeedback) return;
        el.promoFeedback.textContent = msg;
        el.promoFeedback.className = `promo-feedback ${type}`;
    }

    // --- Drawer Controls ---
    function openCartDrawer() {
        el.cartOverlay.classList.add('active');
        el.cartDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCartDrawer() {
        el.cartOverlay.classList.remove('active');
        el.cartDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Checkout Operations ---
    function openCheckoutModal() {
        if (cart.length === 0) {
            showToast('Your basket is empty. Please add items before checking out.', 'warning');
            return;
        }

        closeCartDrawer();
        const totals = calculateTotals();
        el.modalSummaryItems.textContent = `${totals.totalItems} item(s)`;
        el.modalSummaryTotal.textContent = `Rs. ${totals.grandTotal.toLocaleString()}`;
        el.checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCheckoutModal() {
        el.checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleOrderType(type) {
        if (type === 'takeaway') {
            el.deliveryAddressGroup.style.display = 'none';
            document.getElementById('custAddress').removeAttribute('required');
        } else {
            el.deliveryAddressGroup.style.display = 'block';
            document.getElementById('custAddress').setAttribute('required', 'true');
        }
    }

    function handleOrderSubmit(e) {
        e.preventDefault();
        const totals = calculateTotals();
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const address = document.getElementById('custAddress') ? document.getElementById('custAddress').value.trim() : 'Self Pickup';
        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const payMethod = document.querySelector('input[name="payMethod"]:checked').value;
        const instructions = document.getElementById('custInstructions').value.trim();

        // Create Order Summary
        const orderId = 'SM-' + Math.floor(100000 + Math.random() * 900000);
        const orderDate = new Date().toLocaleDateString('en-PK', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        // Populate receipt
        el.orderReceiptBox.innerHTML = `
            <div style="border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                <strong>Order #:</strong> ${orderId}<br>
                <strong>Date & Time:</strong> ${orderDate}<br>
                <strong>Customer:</strong> ${name} (${phone})<br>
                <strong>Order Type:</strong> ${orderType.toUpperCase()} | <strong>Payment:</strong> ${payMethod}
            </div>
            <div>
                <strong>Items Ordered:</strong>
                <ul style="padding-left: 1.2rem; margin: 0.4rem 0;">
                    ${cart.map(i => `<li>${i.name} &times; ${i.quantity} — Rs. ${(i.price * i.quantity).toLocaleString()}</li>`).join('')}
                </ul>
                <div style="font-weight: 700; color: #d4af37; font-size: 1.05rem; margin-top: 0.5rem;">
                    Total Payable: Rs. ${totals.grandTotal.toLocaleString()}
                </div>
            </div>
        `;

        // Clear Cart
        cart = [];
        appliedPromo = null;
        saveCartToStorage();
        updateCartUI();

        // Close checkout, open success
        closeCheckoutModal();
        el.orderSuccessModal.classList.add('active');
        showToast('Your order has been placed successfully!', 'success');
    }

    function orderViaWhatsAppDirect() {
        if (cart.length === 0) {
            showToast('Basket is empty. Please add delicious dishes first!', 'warning');
            return;
        }

        const totals = calculateTotals();
        const name = document.getElementById('custName').value.trim() || 'Valued Guest';
        const phone = document.getElementById('custPhone').value.trim() || 'N/A';
        const address = document.getElementById('custAddress') ? document.getElementById('custAddress').value.trim() : 'Pickup';
        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const payMethod = document.querySelector('input[name="payMethod"]:checked').value;

        let message = `🍽️ *NEW ONLINE FOOD ORDER - SAWERA & MEHWISH*\n`;
        message += `--------------------------------------\n`;
        message += `👤 *Customer:* ${name}\n`;
        message += `📞 *Phone:* ${phone}\n`;
        message += `🛵 *Order Type:* ${orderType.toUpperCase()}\n`;
        if (orderType === 'delivery') {
            message += `📍 *Delivery Address:* ${address}\n`;
        }
        message += `💳 *Payment Method:* ${payMethod}\n`;
        message += `--------------------------------------\n`;
        message += `🍲 *DISHES ORDERED:*\n`;
        cart.forEach((i, idx) => {
            message += `${idx + 1}. ${i.name} (Qty: ${i.quantity}) - Rs. ${(i.price * i.quantity).toLocaleString()}\n`;
        });
        message += `--------------------------------------\n`;
        message += `💵 *Subtotal:* Rs. ${totals.subtotal.toLocaleString()}\n`;
        if (totals.discount > 0) {
            message += `🏷️ *Discount (${appliedPromo.code}):* -Rs. ${totals.discount.toLocaleString()}\n`;
        }
        message += `🛵 *Delivery Charges:* Rs. ${totals.delivery.toLocaleString()}\n`;
        message += `💰 *TOTAL PAYABLE:* Rs. ${totals.grandTotal.toLocaleString()}\n`;
        message += `--------------------------------------\n`;
        message += `Please confirm my order and send estimated delivery time! Thank you.`;

        const encodedMsg = encodeURIComponent(message);
        const waUrl = `https://wa.me/923001234567?text=${encodedMsg}`;
        window.open(waUrl, '_blank');
        showToast('Opening WhatsApp with your complete order breakdown...', 'info');
    }

    function closeSuccessModal() {
        el.orderSuccessModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Table Reservation Handler ---
    function handleReservationSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('resName').value;
        const phone = document.getElementById('resPhone').value;
        const date = document.getElementById('resDate').value;
        const time = document.getElementById('resTime').value;
        const guests = document.getElementById('resGuests').value;
        const area = document.getElementById('resArea').value;

        showToast(`Table reserved for ${name} (${guests} Guests) on ${date} at ${time}!`, 'success');
        document.getElementById('reservationForm').reset();
    }

    // --- Contact & Newsletter Handlers ---
    function handleContactSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        showToast(`Thank you ${name}! Your message has been sent to our management team.`, 'success');
        document.getElementById('contactForm').reset();
    }

    function handleNewsletter(e) {
        e.preventDefault();
        showToast('Thank you for subscribing! Check your inbox for secret discount codes.', 'success');
        e.target.reset();
    }

    // --- Local Storage Management ---
    function saveCartToStorage() {
        try {
            localStorage.setItem('sawera_mehwish_cart', JSON.stringify(cart));
        } catch (err) {
            console.error('Failed to save cart to localStorage', err);
        }
    }

    function loadCartFromStorage() {
        try {
            const saved = localStorage.getItem('sawera_mehwish_cart');
            if (saved) {
                cart = JSON.parse(saved);
            }
        } catch (err) {
            cart = [];
        }
    }

    // --- Toast Notifications ---
    function showToast(message, type = 'info') {
        if (!el.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'warning') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        el.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3500);
    }

    // --- Public API ---
    return {
        init,
        addToCart,
        addDealToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        openCartDrawer,
        closeCartDrawer,
        openCheckoutModal,
        closeCheckoutModal,
        toggleOrderType,
        handleOrderSubmit,
        orderViaWhatsAppDirect,
        closeSuccessModal,
        handleReservationSubmit,
        handleContactSubmit,
        handleNewsletter
    };
})();

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', app.init);
