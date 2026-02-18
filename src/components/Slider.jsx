
import { useState, useEffect } from 'react';

function Slider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;


  // 3  products from database
  useEffect(() => {
     fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 3));
      })
      .catch(err => console.error('Error fetching slider products:', err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1 >= products.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 < 0 ? products.length - 1 : prev - 1));
  };

  if (products.length === 0) return null;

  return (
    <section className="slider-section">
      <h3 className="slider-title">FEATURED PICKS</h3>
      <p className="slider-subtitle">Handpicked just for you!</p>

      <div className="slider-container">
        {/* LEFT ARROW */}
        <button className="slider-arrow left" onClick={prevSlide}>
          ‹
        </button>

        {/* SLIDER CARDS */}
        <div className="slider-track">
          <div 
            className="slider-cards"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="slider-card">
                <img src={`/images/${product.image}`} alt={product.alt} />
                <h4>{product.name}</h4>
                <p className="slider-price">${product.price}</p>
                <button className="slider-shop-btn">VIEW PRODUCT</button>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-arrow right" onClick={nextSlide}>
          ›
        </button>
      </div>
    </section>
  );
}

export default Slider;