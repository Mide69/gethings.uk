// Sample business data
const businesses = [
    {
        name: "Mama Ngozi's Kitchen",
        description: "Authentic Nigerian cuisine with jollof rice, suya, and pepper soup",
        category: "Restaurant",
        city: "London",
        postcode: "E1 6AN",
        country: "Nigeria",
        featured: true
    },
    {
        name: "Accra Gold Jewelry",
        description: "Handcrafted gold jewelry and traditional Ghanaian accessories",
        category: "Jewelry & Accessories",
        city: "London",
        postcode: "N1 9AG",
        country: "Ghana",
        featured: true
    },
    {
        name: "Nairobi Coffee Roasters",
        description: "Premium Kenyan coffee beans, roasted fresh daily",
        category: "Food & Beverage",
        city: "Edinburgh",
        postcode: "EH1 1YZ",
        country: "Kenya",
        featured: true
    },
    {
        name: "Afrobeats Barber Shop",
        description: "Professional haircuts and grooming services for the modern African man",
        category: "Beauty & Personal Care",
        city: "Manchester",
        postcode: "M1 1AA",
        country: "Nigeria"
    },
    {
        name: "Lagos Fashion House",
        description: "Traditional and contemporary African clothing, ankara fabrics, and custom tailoring",
        category: "Fashion & Clothing",
        city: "Birmingham",
        postcode: "B1 1BB",
        country: "Nigeria"
    },
    {
        name: "Kumasi Kente Cloth",
        description: "Authentic kente cloth, traditional fabrics, and African textiles",
        category: "Fashion & Clothing",
        city: "Manchester",
        postcode: "M2 3WQ",
        country: "Ghana"
    },
    {
        name: "Addis Red Sea Restaurant",
        description: "Traditional Ethiopian cuisine with injera, doro wat, and vegetarian options",
        category: "Restaurant",
        city: "London",
        postcode: "SE5 8TR",
        country: "Ethiopia",
        featured: true
    },
    {
        name: "Cape Town Braai House",
        description: "South African BBQ, boerewors, biltong, and traditional braai experience",
        category: "Restaurant",
        city: "London",
        postcode: "SW11 1HT",
        country: "South Africa",
        featured: true
    },
    {
        name: "Banku & Tilapia Restaurant",
        description: "Traditional Ghanaian dishes including banku, tilapia, and kelewele",
        category: "Restaurant",
        city: "Birmingham",
        postcode: "B2 4QA",
        country: "Ghana"
    },
    {
        name: "Eko Market",
        description: "African groceries, spices, and specialty foods from Nigeria and West Africa",
        category: "Grocery & Food",
        city: "Leeds",
        postcode: "LS1 1UR",
        country: "Nigeria"
    },
    {
        name: "Ashanti Beauty Salon",
        description: "Hair braiding, African hair care, and beauty treatments",
        category: "Beauty & Personal Care",
        city: "Glasgow",
        postcode: "G1 1RE",
        country: "Ghana"
    },
    {
        name: "Maasai Craft Gallery",
        description: "Authentic Kenyan crafts, sculptures, and traditional artwork",
        category: "Arts & Crafts",
        city: "London",
        postcode: "W1F 8NH",
        country: "Kenya"
    },
    {
        name: "Ethiopian Coffee House",
        description: "Traditional Ethiopian coffee ceremony and premium coffee beans",
        category: "Food & Beverage",
        city: "Glasgow",
        postcode: "G2 4JR",
        country: "Ethiopia"
    },
    {
        name: "Ubuntu IT Solutions",
        description: "IT consulting, web development, and digital services",
        category: "Technology",
        city: "London",
        postcode: "EC2A 3AY",
        country: "South Africa"
    },
    {
        name: "Johannesburg Gems",
        description: "South African diamonds, jewelry, and precious stones",
        category: "Jewelry & Accessories",
        city: "Manchester",
        postcode: "M6 8HD",
        country: "South Africa"
    },
    {
        name: "Safari Hair Studio",
        description: "Specialized in natural hair care and African hairstyles",
        category: "Beauty & Personal Care",
        city: "Birmingham",
        postcode: "B3 2TA",
        country: "Kenya"
    },
    {
        name: "Kenyan Spice Market",
        description: "Authentic Kenyan spices, tea, and specialty food products",
        category: "Grocery & Food",
        city: "Manchester",
        postcode: "M4 1EG",
        country: "Kenya"
    },
    {
        name: "Habesha Cultural Center",
        description: "Ethiopian cultural events, language classes, and community services",
        category: "Education & Culture",
        city: "Manchester",
        postcode: "M5 3EQ",
        country: "Ethiopia"
    },
    {
        name: "Rooibos Tea Company",
        description: "Premium South African rooibos tea and herbal blends",
        category: "Food & Beverage",
        city: "Bristol",
        postcode: "BS1 4DJ",
        country: "South Africa"
    },
    {
        name: "Ghana Connect Services",
        description: "Money transfer, travel booking, and visa assistance services",
        category: "Financial Services",
        city: "London",
        postcode: "SW9 8EF",
        country: "Ghana"
    }
];

let filteredBusinesses = [...businesses];

// Country flag emojis
const countryFlags = {
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭',
    'Kenya': '🇰🇪',
    'Ethiopia': '🇪🇹',
    'South Africa': '🇿🇦',
    'Somalia': '🇸🇴',
    'Uganda': '🇺🇬',
    'Tanzania': '🇹🇿',
    'Rwanda': '🇷🇼',
    'Cameroon': '🇨🇲',
    'Senegal': '🇸🇳',
    'Mali': '🇲🇱',
    'Burkina Faso': '🇧🇫',
    'Ivory Coast': '🇨🇮',
    'Zimbabwe': '🇿🇼',
    'Zambia': '🇿🇲',
    'Botswana': '🇧🇼',
    'Namibia': '🇳🇦',
    'Mozambique': '🇲🇿',
    'Madagascar': '🇲🇬',
    'Mauritius': '🇲🇺',
    'Seychelles': '🇸🇨'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayBusinesses(businesses.filter(b => b.featured));
    
    // Add event listeners for real-time search
    document.getElementById('searchInput').addEventListener('input', searchBusinesses);
    document.getElementById('cityFilter').addEventListener('change', searchBusinesses);
    document.getElementById('categoryFilter').addEventListener('change', searchBusinesses);
});

// Display businesses
function displayBusinesses(businessesToShow) {
    const businessGrid = document.getElementById('businessGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Hide loading spinner
    loadingSpinner.style.display = 'none';
    
    if (businessesToShow.length === 0) {
        businessGrid.innerHTML = '<div class="no-results">No businesses found matching your criteria.</div>';
        return;
    }
    
    businessGrid.innerHTML = businessesToShow.map(business => `
        <div class="business-card">
            <div class="business-image">
                ${countryFlags[business.country] || '🏪'}
            </div>
            <div class="business-info">
                <div class="business-name">${business.name}</div>
                <div class="business-category">${business.category}</div>
                <div class="business-description">${business.description}</div>
                <div class="business-location">
                    📍 ${business.city}, ${business.postcode}
                </div>
                <div class="business-country">${business.country}</div>
            </div>
        </div>
    `).join('');
}

// Search and filter businesses
function searchBusinesses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cityFilter = document.getElementById('cityFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filteredBusinesses = businesses.filter(business => {
        const matchesSearch = !searchTerm || 
            business.name.toLowerCase().includes(searchTerm) ||
            business.description.toLowerCase().includes(searchTerm) ||
            business.category.toLowerCase().includes(searchTerm) ||
            business.country.toLowerCase().includes(searchTerm);
            
        const matchesCity = !cityFilter || business.city === cityFilter;
        const matchesCategory = !categoryFilter || business.category === categoryFilter;
        
        return matchesSearch && matchesCity && matchesCategory;
    });
    
    displayBusinesses(filteredBusinesses);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactivity
function showAllBusinesses() {
    displayBusinesses(businesses);
    document.getElementById('businesses').scrollIntoView({ behavior: 'smooth' });
}

// Add click event to show all businesses when clicking on stats
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('click', showAllBusinesses);
        stat.style.cursor = 'pointer';
    });
});