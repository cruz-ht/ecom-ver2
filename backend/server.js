require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});




db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Get all products (with filters)
app.get('/api/products', (req, res) => {
    const { category, minPrice, maxPrice } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    let params = [];
    
    if (category && category !== 'all') {
        query += ' AND category = ?';
        params.push(category);
    }
    if (minPrice) {
        query += ' AND price >= ?';
        params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(parseFloat(maxPrice));
    }
    
    query += ' ORDER BY id';
    
    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch products' });
            return;
        }
        res.json(results);
    });
});

// Get all categories
app.get('/api/categories', (req, res) => {
    db.query('SELECT DISTINCT category FROM products ORDER BY category', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch categories' });
            return;
        }
        res.json(results.map(row => row.category));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
