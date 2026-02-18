
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceSort, setPriceSort] = useState('default');
  const [loading, setLoading] = useState(true);
  
  const API_URL = import.meta.env.VITE_API_URL;


  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Fetch all products
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Sort by price
    if (priceSort === 'low-to-high') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (priceSort === 'high-to-low') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(result);
  }, [selectedCategories, priceSort, products]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceSort('default');
  };

  return (
    <>
      <Navbar />

      <div className="products-page-container">
        
        <aside className="filters-sidebar">
          <div className="filter-header">
            <h2>FILTER BY:</h2>
            {(selectedCategories.length > 0 || priceSort !== 'default') && (
              <button className="clear-all" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="filter-section">
            <h3>Product Type</h3>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Sort */}
          <div className="filter-section">
            <h3>Sort by Price</h3>
            <select 
              className="price-sort-dropdown"
              value={priceSort} 
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <main>
          <h1 className="products-title">SHOP ALL PRODUCTS</h1>
          
          <p className="products-count">
            {filteredProducts.length} of {products.length} products
          </p>

          {loading ? (
            <p className="loading">Loading products...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <p className="no-products">No products found. Try adjusting your filters!</p>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img 
                        src={`/images/${product.image}`} 
                        alt={product.alt}
                      />
                    </div>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    <button className="add-to-bag">ADD TO BAG</button>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Products;