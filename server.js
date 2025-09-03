const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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