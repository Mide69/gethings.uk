const express = require('express');
const path = require('path');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', (req, res) => {
    const { category, location, search } = req.query;
    let filtered = products;
    
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (location && location !== 'all') {
        filtered = filtered.filter(p => p.location === location);
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.country.toLowerCase().includes(searchLower) ||
            p.seller.toLowerCase().includes(searchLower)
        );
    }
    
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`🛒 Gethings Store running on http://localhost:${PORT}`);
});