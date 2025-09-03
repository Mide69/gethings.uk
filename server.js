const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve CSS
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

// Serve images
app.get('/gethings\ logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'gethings logo.png'));
});

app.get('/getthings\ hero.webp', (req, res) => {
    res.sendFile(path.join(__dirname, 'getthings hero.webp'));
});

// Waitlist signup endpoint
app.post('/api/signup', (req, res) => {
    const { name, email, type } = req.body;
    console.log(`New ${type} signup: ${name} - ${email}`);
    res.json({ success: true, message: 'Successfully joined waitlist!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Getthings landing page running on http://localhost:${PORT}`);
});