import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
 
const LilyBags = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Elegant Evening Clutch',
      price: 89.99,
      description: 'Perfect for special occasions with pearl detailing',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      colors: ['black', 'gold', 'silver'],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Urban Backpack',
      price: 129.99,
      description: 'Water-resistant with laptop compartment and multiple pockets',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      colors: ['navy', 'gray', 'olive'],
      rating: 4.6
    },
    {
      id: 3,
      name: 'Boho Leather Tote',
      price: 149.99,
      description: 'Handcrafted genuine leather with intricate stitching',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      colors: ['brown', 'tan', 'camel'],
      rating: 4.9
    },
    {
      id: 4,
      name: 'Mini Crossbody',
      price: 65.99,
      description: 'Compact yet spacious with adjustable strap',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
      colors: ['red', 'pink', 'beige'],
      rating: 4.7
    },
    {
      id: 5,
      name: 'Designer Satchel',
      price: 199.99,
      description: 'Luxury Italian leather with gold hardware',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d',
      colors: ['black', 'burgundy'],
      rating: 5.0
    },
    {
      id: 6,
      name: 'Weekender Duffle',
      price: 159.99,
      description: 'Spacious travel bag with shoe compartment',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
      colors: ['charcoal', 'navy', 'camel'],
      rating: 4.5
    }
  ];
 
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
 
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          product.name.toLowerCase().includes(selectedCategory) || 
                          product.description.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
 
  // Add to cart function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showNotification(`${product.name} added to cart!`);
  };
 
  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showNotification('Item removed from cart');
  };
 
  // Update quantity function
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
 
  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
 
  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
 
  // Categories for filtering
  const categories = ['all', 'clutch', 'backpack', 'tote', 'crossbody', 'satchel', 'duffle'];
 
  return (
    <div className="lily-bags-app">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
          <i className="bi bi-check-circle-fill"></i>
        </div>
      )}
 
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={`bi bi-${isMenuOpen ? 'x' : 'list'}`}></i>
            </button>
            <div className="logo">
              <i className="bi bi-flower1"></i>
              <h1>Lily's Bags</h1>
            </div>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href=''>Home</a></li>
                <li><a href=''>Shop</a></li>
                <li><a href=''>Collections</a></li>
                <li><a href=''>About</a></li>
                <li><a href=''>Contact</a></li>
              </ul>
            </nav>
            <div className="header-icons">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search bags..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search"></i>
              </div>
              <button className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
                <i className="bi bi-bag"></i>
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>
 
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h2>Elegance Carried with You</h2>
            <p>Discover our exquisite collection of handcrafted bags for every occasion</p>
            <button className="btn-primary">Shop Now</button>
          </div>
        </div>
      </section>
 
      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Category Filters */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
 
          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-badge">
                      <span className="rating">
                        <i className="bi bi-star-fill"></i> {product.rating}
                      </span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-plus-lg"></i> Add to Cart
                    </button>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <div className="color-options">
                        {product.colors.map(color => (
                          <span 
                            key={color} 
                            className="color-dot" 
                            style={{ backgroundColor: color }}
                            title={color}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="bi bi-search"></i>
                <p>No bags found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </main>
 
      {/* Shopping Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Shopping Bag</h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-bag-x"></i>
              <p>Your bag is empty</p>
              <button 
                className="btn-primary" 
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
 
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Lily's Bags</h4>
              <p>Handcrafted elegance for the modern woman</p>
              <div className="social-icons">
                <a href=''><i className="bi bi-facebook"></i></a>
                <a href=''><i className="bi bi-instagram"></i></a>
                <a href=''><i className="bi bi-pinterest"></i></a>
                <a href=''><i className="bi bi-twitter"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Shop</h4>
              <ul>
                <li><a href=''>All Bags</a></li>
                <li><a href=''>New Arrivals</a></li>
                <li><a href=''>Best Sellers</a></li>
                <li><a href=''>Sale</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Customer Care</h4>
              <ul>
                <li><a href=''>Contact Us</a></li>
                <li><a href=''>FAQs</a></li>
                <li><a href=''>Shipping & Returns</a></li>
                <li><a href=''>Size Guide</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p>Subscribe for exclusive offers and updates</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button><i className="bi bi-envelope"></i></button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Lily's Bags. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
 
// CSS Styles
const styles = `
.lily-bags-app {
  'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  position: relative;
  min-height: 100vh;
}
 
/* Header Styles */
.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
}
 
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #8e44ad;
}
 
.logo i {
  font-size: 28px;
}
 
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}
 
.nav ul {
  display: flex;
  list-style: none;
  gap: 25px;
}
 
.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}
 
.nav a:hover {
  color: #8e44ad;
}
 
.header-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}
 
.search-box {
  position: relative;
}
 
.search-box input {
  padding: 8px 15px 8px 35px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  transition: all 0.3s;
}
 
.search-box input:focus {
  border-color: #8e44ad;
  box-shadow: 0 0 5px rgba(142, 68, 173, 0.3);
}
 
.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}
 
.cart-icon {
  position: relative;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #333;
}
 
.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #8e44ad;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
 
/* Hero Section */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), u rl('https://images.unsplash.com/photo-1483985988355-763728e1935b');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
}
 
.hero-content {
  max-width: 800px;
  0 auto;
}
 
.hero h2 {
  font-size: 48px;
  20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
 
.hero p {
  font-size: 20px;
  30px;
}
 
.btn-primary {
  background-color: #8e44ad;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}
 
.btn-primary:hover {
  background-color: #732d91;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
 
/* Category Filters */
.category-filters {
  display: flex;
  gap: 10px;
  40px 0 20px;
  flex-wrap: wrap;
}
 
.category-btn {
  padding: 8px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
 
.category-btn:hover {
  border-color: #8e44ad;
  color: #8e44ad;
}
 
.category-btn.active {
  background-color: #8e44ad;
  color: white;
  border-color: #8e44ad;
}
 
/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  40px 0;
}
 
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
 
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
 
.product-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}
 
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
 
.product-card:hover .product-image img {
  transform: scale(1.05);
}
 
.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
}
 
.rating {
  display: flex;
  align-items: center;
  gap: 3px;
  color: #f39c12;
}
 
.add-to-cart-btn {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  background: #8e44ad;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
 
.product-card:hover .add-to-cart-btn {
  bottom: 0;
}
 
.product-info {
  padding: 20px;
}
 
.product-info h3 {
  0 0 10px;
  font-size: 18px;
}
 
.product-description {
  color: #666;
  font-size: 14px;
  15px;
  1.5;
}
 
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 
.price {
  font-weight: 700;
  color: #8e44ad;
  font-size: 18px;
}
 
.color-options {
  display: flex;
  gap: 5px;
}
 
.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
  cursor: pointer;
}
 
/* No Results */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 0;
}
 
.no-results i {
  font-size: 50px;
  color: #ddd;
  20px;
}
 
.no-results p {
  font-size: 18px;
  color: #666;
}
 
/* Cart Sidebar */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: right 0.3s ease-out;
  display: flex;
  flex-direction: column;
}
 
.cart-sidebar.open {
  right: 0;
}
 
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
 
.cart-sidebar.open + .cart-overlay {
  opacity: 1;
  pointer-events: auto;
}
 
.cart-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 
.cart-header h3 {
  0;
  font-size: 22px;
}
 
.close-cart {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}
 
.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
 
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #666;
}
 
.empty-cart i {
  font-size: 50px;
  20px;
  color: #ddd;
}
 
.empty-cart p {
  font-size: 18px;
  20px;
}
 
.cart-item {
  display: flex;
  gap: 15px;
  20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
 
.item-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
}
 
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.item-details {
  flex: 1;
}
 
.item-details h4 {
  0 0 5px;
  font-size: 16px;
}
 
.item-details p {
  0 0 10px;
  color: #8e44ad;
  font-weight: 600;
}
 
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
 
.quantity-controls button {
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
 
.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
 
.quantity-controls span {
  min-width: 20px;
  text-align: center;
}
 
.remove-item {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 18px;
  cursor: pointer;
  align-self: flex-start;
}
 
.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
}
 
.cart-total {
  display: flex;
  justify-content: space-between;
  20px;
  font-size: 18px;
  font-weight: 700;
}
 
.checkout-btn {
  width: 100%;
  padding: 15px;
  background: #8e44ad;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s;
}
 
.checkout-btn:hover {
  background: #732d91;
}
 
/* Notification */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #2ecc71;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1002;
  animation: slideUp 0.3s, fadeOut 0.5s 2.5s forwards;
}
 
.notification i {
  font-size: 20px;
}
 
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
 
@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
 
/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  padding: 60px 0 20px;
}
 
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  40px;
}
 
.footer-section h4 {
  font-size: 18px;
  20px;
  position: relative;
  padding-bottom: 10px;
}
 
.footer-section h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background: #8e44ad;
}
 
.footer-section p {
  color: #bdc3c7;
  1.6;
  20px;
}
 
.social-icons {
  display: flex;
  gap: 15px;
}
 
.social-icons a {
  color: white;
  font-size: 20px;
  transition: color 0.3s;
}
 
.social-icons a:hover {
  color: #8e44ad;
}
 
.footer-section ul {
  list-style: none;
  padding: 0;
}
 
.footer-section ul li {
  10px;
}
 
.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}
 
.footer-section ul li a:hover {
  color: #8e44ad;
}
 
.newsletter-form {
  display: flex;
  20px;
}
 
.newsletter-form input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px 0 0 3px;
  outline: none;
}
 
.newsletter-form button {
  background: #8e44ad;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: background 0.3s;
}
 
.newsletter-form button:hover {
  background: #732d91;
}
 
.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
  font-size: 14px;
}
 
/* Responsive Styles */
@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .cart-sidebar {
    width: 350px;
  }
}
 
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 80%;
    height: calc(100vh - 80px);
    background: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s;
  }
  
  .nav.open {
    left: 0;
  }
  
  .nav ul {
    flex-direction: column;
    padding: 20px;
  }
  
  .header-icons {
    gap: 15px;
  }
  
  .hero h2 {
    font-size: 36px;
  }
  
  .hero p {
    font-size: 18px;
  }
  
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}
 
@media (max-width: 576px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .hero {
    padding: 80px 0;
  }
  
  .hero h2 {
    font-size: 28px;
  }
  
  .hero p {
    font-size: 16px;
  }
  
  .category-filters {
    justify-content: center;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
}
`;
 
// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
 
export default LilyBags;
