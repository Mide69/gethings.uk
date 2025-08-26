const sampleBusinesses = [
  // Nigerian Businesses
  { name: "Mama Ngozi's Kitchen", description: "Authentic Nigerian cuisine with jollof rice, suya, and pepper soup", category: "Restaurant", location: { city: "London", postcode: "E1 6AN" }, contact: { phone: "020 7123 4567", email: "info@mamangozi.co.uk" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Nigeria", featured: true },
  { name: "Afrobeats Barber Shop", description: "Professional haircuts and grooming services for the modern African man", category: "Beauty & Personal Care", location: { city: "Manchester", postcode: "M1 1AA" }, contact: { phone: "0161 234 5678" }, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400", country: "Nigeria" },
  { name: "Lagos Fashion House", description: "Traditional and contemporary African clothing, ankara fabrics, and custom tailoring", category: "Fashion & Clothing", location: { city: "Birmingham", postcode: "B1 1BB" }, contact: { phone: "0121 345 6789", website: "www.lagosfashion.co.uk" }, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", country: "Nigeria" },
  { name: "Naija Express Logistics", description: "Reliable shipping and cargo services between UK and Nigeria", category: "Logistics & Shipping", location: { city: "London", postcode: "SE15 4QF" }, contact: { phone: "020 8765 4321", email: "ship@naijaexpress.co.uk" }, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", country: "Nigeria" },
  { name: "Eko Market", description: "African groceries, spices, and specialty foods from Nigeria and West Africa", category: "Grocery & Food", location: { city: "Leeds", postcode: "LS1 1UR" }, contact: { phone: "0113 456 7890" }, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", country: "Nigeria" },

  // Ghanaian Businesses
  { name: "Accra Gold Jewelry", description: "Handcrafted gold jewelry and traditional Ghanaian accessories", category: "Jewelry & Accessories", location: { city: "London", postcode: "N1 9AG" }, contact: { phone: "020 7234 5678", website: "www.accragold.co.uk" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "Ghana", featured: true },
  { name: "Kumasi Kente Cloth", description: "Authentic kente cloth, traditional fabrics, and African textiles", category: "Fashion & Clothing", location: { city: "Manchester", postcode: "M2 3WQ" }, contact: { phone: "0161 345 6789" }, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400", country: "Ghana" },
  { name: "Banku & Tilapia Restaurant", description: "Traditional Ghanaian dishes including banku, tilapia, and kelewele", category: "Restaurant", location: { city: "Birmingham", postcode: "B2 4QA" }, contact: { phone: "0121 456 7890", email: "info@bankutilapia.co.uk" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Ghana" },
  { name: "Ashanti Beauty Salon", description: "Hair braiding, African hair care, and beauty treatments", category: "Beauty & Personal Care", location: { city: "Glasgow", postcode: "G1 1RE" }, contact: { phone: "0141 234 5678" }, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", country: "Ghana" },
  { name: "Ghana Connect Services", description: "Money transfer, travel booking, and visa assistance services", category: "Financial Services", location: { city: "London", postcode: "SW9 8EF" }, contact: { phone: "020 8123 4567", website: "www.ghanaconnect.co.uk" }, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400", country: "Ghana" },

  // Kenyan Businesses
  { name: "Nairobi Coffee Roasters", description: "Premium Kenyan coffee beans, roasted fresh daily", category: "Food & Beverage", location: { city: "Edinburgh", postcode: "EH1 1YZ" }, contact: { phone: "0131 234 5678", email: "hello@nairobicoffee.co.uk" }, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400", country: "Kenya", featured: true },
  { name: "Maasai Craft Gallery", description: "Authentic Kenyan crafts, sculptures, and traditional artwork", category: "Arts & Crafts", location: { city: "London", postcode: "W1F 8NH" }, contact: { phone: "020 7345 6789" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Kenya" },
  { name: "Safari Hair Studio", description: "Specialized in natural hair care and African hairstyles", category: "Beauty & Personal Care", location: { city: "Birmingham", postcode: "B3 2TA" }, contact: { phone: "0121 567 8901", website: "www.safarihairstudio.co.uk" }, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", country: "Kenya" },
  { name: "Kenyan Spice Market", description: "Authentic Kenyan spices, tea, and specialty food products", category: "Grocery & Food", location: { city: "Manchester", postcode: "M4 1EG" }, contact: { phone: "0161 456 7890" }, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", country: "Kenya" },
  { name: "Mombasa Motors", description: "Car sales, repairs, and automotive services", category: "Automotive", location: { city: "Leeds", postcode: "LS2 8JT" }, contact: { phone: "0113 567 8901", email: "info@mombasamotors.co.uk" }, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400", country: "Kenya" },

  // Ethiopian Businesses
  { name: "Addis Red Sea Restaurant", description: "Traditional Ethiopian cuisine with injera, doro wat, and vegetarian options", category: "Restaurant", location: { city: "London", postcode: "SE5 8TR" }, contact: { phone: "020 7456 7890", email: "info@addisredsea.co.uk" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Ethiopia", featured: true },
  { name: "Ethiopian Coffee House", description: "Traditional Ethiopian coffee ceremony and premium coffee beans", category: "Food & Beverage", location: { city: "Glasgow", postcode: "G2 4JR" }, contact: { phone: "0141 345 6789" }, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400", country: "Ethiopia" },
  { name: "Habesha Cultural Center", description: "Ethiopian cultural events, language classes, and community services", category: "Education & Culture", location: { city: "Manchester", postcode: "M5 3EQ" }, contact: { phone: "0161 567 8901", website: "www.habeshacenter.co.uk" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Ethiopia" },
  { name: "Sheba Beauty Salon", description: "Ethiopian hair braiding and traditional beauty treatments", category: "Beauty & Personal Care", location: { city: "Birmingham", postcode: "B4 6HH" }, contact: { phone: "0121 678 9012" }, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", country: "Ethiopia" },
  { name: "Blue Nile Travel", description: "Travel services specializing in Ethiopia and East Africa", category: "Travel & Tourism", location: { city: "London", postcode: "W2 1HB" }, contact: { phone: "020 8234 5678", email: "info@blueniletravel.co.uk" }, image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", country: "Ethiopia" },

  // Somali Businesses
  { name: "Mogadishu Money Transfer", description: "Fast and secure money transfer services to Somalia and East Africa", category: "Financial Services", location: { city: "London", postcode: "E1 4NS" }, contact: { phone: "020 7567 8901", email: "info@mogadishumoney.co.uk" }, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400", country: "Somalia" },
  { name: "Somali Community Kitchen", description: "Traditional Somali cuisine including anjero, sambusa, and camel meat", category: "Restaurant", location: { city: "Sheffield", postcode: "S1 2HE" }, contact: { phone: "0114 234 5678" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Somalia" },
  { name: "Horn of Africa Logistics", description: "Shipping and cargo services to Somalia, Djibouti, and Eritrea", category: "Logistics & Shipping", location: { city: "Birmingham", postcode: "B5 5SE" }, contact: { phone: "0121 789 0123", website: "www.hornlogistics.co.uk" }, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", country: "Somalia" },
  { name: "Barakah Halal Market", description: "Halal meat, Somali groceries, and Middle Eastern foods", category: "Grocery & Food", location: { city: "Leicester", postcode: "LE1 5WW" }, contact: { phone: "0116 345 6789" }, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", country: "Somalia" },
  { name: "Somali Women's Center", description: "Support services, education, and community programs for Somali women", category: "Community Services", location: { city: "London", postcode: "N7 6PA" }, contact: { phone: "020 8345 6789", email: "info@somaliwomen.org.uk" }, image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400", country: "Somalia" },

  // South African Businesses
  { name: "Cape Town Braai House", description: "South African BBQ, boerewors, biltong, and traditional braai experience", category: "Restaurant", location: { city: "London", postcode: "SW11 1HT" }, contact: { phone: "020 7678 9012", email: "info@capetownbraai.co.uk" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "South Africa", featured: true },
  { name: "Johannesburg Gems", description: "South African diamonds, jewelry, and precious stones", category: "Jewelry & Accessories", location: { city: "Manchester", postcode: "M6 8HD" }, contact: { phone: "0161 678 9012", website: "www.joburggems.co.uk" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "South Africa" },
  { name: "Springbok Sports Bar", description: "South African sports bar with rugby, cricket, and traditional drinks", category: "Entertainment", location: { city: "Edinburgh", postcode: "EH2 2BY" }, contact: { phone: "0131 345 6789" }, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400", country: "South Africa" },
  { name: "Rooibos Tea Company", description: "Premium South African rooibos tea and herbal blends", category: "Food & Beverage", location: { city: "Bristol", postcode: "BS1 4DJ" }, contact: { phone: "0117 234 5678", email: "info@rooibostea.co.uk" }, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", country: "South Africa" },
  { name: "Ubuntu IT Solutions", description: "IT consulting, web development, and digital services", category: "Technology", location: { city: "London", postcode: "EC2A 3AY" }, contact: { phone: "020 8456 7890", website: "www.ubuntu-it.co.uk" }, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400", country: "South Africa" },

  // Zimbabwean Businesses
  { name: "Harare Hair Extensions", description: "Premium hair extensions, wigs, and African hair products", category: "Beauty & Personal Care", location: { city: "London", postcode: "SE15 2RZ" }, contact: { phone: "020 7789 0123" }, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", country: "Zimbabwe" },
  { name: "Zimbabwe Cultural Association", description: "Cultural events, education programs, and community support", category: "Education & Culture", location: { city: "Coventry", postcode: "CV1 2TT" }, contact: { phone: "024 7634 5678", email: "info@zimcultural.org.uk" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Zimbabwe" },
  { name: "Bulawayo Craft Market", description: "Zimbabwean crafts, stone sculptures, and traditional artwork", category: "Arts & Crafts", location: { city: "Birmingham", postcode: "B6 4AS" }, contact: { phone: "0121 890 1234" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Zimbabwe" },
  { name: "Sadza Kitchen", description: "Traditional Zimbabwean food including sadza, nyama, and mazondo", category: "Restaurant", location: { city: "Nottingham", postcode: "NG1 5DT" }, contact: { phone: "0115 456 7890" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Zimbabwe" },

  // Ugandan Businesses
  { name: "Kampala Rolex Stand", description: "Authentic Ugandan rolex (chapati rolls) and street food", category: "Restaurant", location: { city: "London", postcode: "E8 2DP" }, contact: { phone: "020 8567 8901" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Uganda" },
  { name: "Pearl of Africa Tours", description: "Travel services and tours to Uganda and East Africa", category: "Travel & Tourism", location: { city: "Manchester", postcode: "M7 1HL" }, contact: { phone: "0161 789 0123", website: "www.pearlafricatours.co.uk" }, image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", country: "Uganda" },
  { name: "Buganda Fabrics", description: "Traditional Ugandan fabrics, gomesi, and cultural clothing", category: "Fashion & Clothing", location: { city: "Leeds", postcode: "LS3 1AB" }, contact: { phone: "0113 678 9012" }, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", country: "Uganda" },

  // Tanzanian Businesses
  { name: "Kilimanjaro Coffee Co.", description: "Premium Tanzanian coffee beans from the slopes of Mount Kilimanjaro", category: "Food & Beverage", location: { city: "London", postcode: "N4 3HF" }, contact: { phone: "020 8678 9012", email: "info@kilimanjarocoffee.co.uk" }, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400", country: "Tanzania" },
  { name: "Dar es Salaam Spices", description: "Authentic Tanzanian spices, pilau mix, and East African seasonings", category: "Grocery & Food", location: { city: "Birmingham", postcode: "B7 5QG" }, contact: { phone: "0121 901 2345" }, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", country: "Tanzania" },
  { name: "Zanzibar Beauty Lounge", description: "Natural hair care, henna treatments, and beauty services", category: "Beauty & Personal Care", location: { city: "Liverpool", postcode: "L1 8JQ" }, contact: { phone: "0151 234 5678" }, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", country: "Tanzania" },

  // Rwandan Businesses
  { name: "Kigali Tech Hub", description: "Web development, mobile apps, and digital marketing services", category: "Technology", location: { city: "London", postcode: "E2 7DD" }, contact: { phone: "020 7890 1234", website: "www.kigalitech.co.uk" }, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400", country: "Rwanda" },
  { name: "Rwanda Coffee House", description: "Premium Rwandan coffee and traditional coffee ceremonies", category: "Food & Beverage", location: { city: "Cambridge", postcode: "CB1 1PT" }, contact: { phone: "01223 345 678" }, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400", country: "Rwanda" },

  // Cameroonian Businesses
  { name: "Douala Fashion House", description: "Cameroonian traditional wear, modern African fashion, and tailoring", category: "Fashion & Clothing", location: { city: "London", postcode: "SE4 1UZ" }, contact: { phone: "020 8901 2345" }, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", country: "Cameroon" },
  { name: "Cameroon Pepper Soup", description: "Authentic Cameroonian cuisine including pepper soup, ndole, and fufu", category: "Restaurant", location: { city: "Manchester", postcode: "M8 4PY" }, contact: { phone: "0161 890 1234" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Cameroon" },

  // Senegalese Businesses
  { name: "Dakar Drumming School", description: "Traditional West African drumming lessons and cultural workshops", category: "Education & Culture", location: { city: "London", postcode: "SW2 1JF" }, contact: { phone: "020 8012 3456", website: "www.dakardrums.co.uk" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Senegal" },
  { name: "Teranga Restaurant", description: "Senegalese cuisine featuring thieboudienne, yassa, and mafe", category: "Restaurant", location: { city: "Birmingham", postcode: "B8 3NP" }, contact: { phone: "0121 012 3456" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Senegal" },

  // Ivorian Businesses
  { name: "Abidjan Chocolate", description: "Premium Ivorian cocoa products and artisanal chocolates", category: "Food & Beverage", location: { city: "London", postcode: "W3 6UG" }, contact: { phone: "020 8123 4567", email: "info@abidjanchocolate.co.uk" }, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400", country: "Ivory Coast" },
  { name: "Ivorian Cultural Center", description: "Cultural events, French-African language classes, and community programs", category: "Education & Culture", location: { city: "Manchester", postcode: "M9 5AB" }, contact: { phone: "0161 901 2345" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Ivory Coast" },

  // Malian Businesses
  { name: "Bamako Music Store", description: "Traditional West African instruments, kora, djembe, and music lessons", category: "Music & Instruments", location: { city: "London", postcode: "N15 4ND" }, contact: { phone: "020 8234 5678" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Mali" },
  { name: "Mali Gold Jewelry", description: "Traditional Malian gold jewelry and West African accessories", category: "Jewelry & Accessories", location: { city: "Birmingham", postcode: "B9 4AA" }, contact: { phone: "0121 123 4567" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "Mali" },

  // Burkinabe Businesses
  { name: "Ouagadougou Textiles", description: "Burkina Faso traditional fabrics, bogolan cloth, and handwoven textiles", category: "Fashion & Clothing", location: { city: "London", postcode: "SE22 8EW" }, contact: { phone: "020 8345 6789" }, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400", country: "Burkina Faso" },

  // Togolese Businesses
  { name: "Lome Market", description: "Togolese groceries, palm oil, and West African specialty foods", category: "Grocery & Food", location: { city: "London", postcode: "E9 6RG" }, contact: { phone: "020 8456 7890" }, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", country: "Togo" },

  // Beninese Businesses
  { name: "Cotonou Crafts", description: "Beninese traditional crafts, bronze work, and cultural artifacts", category: "Arts & Crafts", location: { city: "Manchester", postcode: "M10 7QR" }, contact: { phone: "0161 012 3456" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Benin" },

  // Guinean Businesses
  { name: "Conakry Cultural Center", description: "Guinean cultural events, traditional dance classes, and community services", category: "Education & Culture", location: { city: "London", postcode: "SW16 2UW" }, contact: { phone: "020 8567 8901" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Guinea" },

  // Sierra Leonean Businesses
  { name: "Freetown Diamond Exchange", description: "Ethical diamond trading and Sierra Leonean precious stones", category: "Jewelry & Accessories", location: { city: "London", postcode: "EC1V 2NX" }, contact: { phone: "020 7678 9012", website: "www.freetowndiamonds.co.uk" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "Sierra Leone" },

  // Liberian Businesses
  { name: "Monrovia Motors", description: "Used car sales specializing in vehicles for West Africa export", category: "Automotive", location: { city: "Birmingham", postcode: "B10 9HY" }, contact: { phone: "0121 234 5678" }, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400", country: "Liberia" },

  // Gambian Businesses
  { name: "Banjul Travel Services", description: "Travel arrangements, visa services, and tours to The Gambia", category: "Travel & Tourism", location: { city: "London", postcode: "SE1 7TP" }, contact: { phone: "020 7789 0123", email: "info@banjultravel.co.uk" }, image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", country: "Gambia" },

  // Cape Verdean Businesses
  { name: "Praia Music Academy", description: "Cape Verdean music lessons, morna, and traditional instruments", category: "Music & Instruments", location: { city: "London", postcode: "SW9 0JA" }, contact: { phone: "020 8890 1234" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Cape Verde" },

  // Mauritanian Businesses
  { name: "Nouakchott Dates", description: "Premium Mauritanian dates and North African dried fruits", category: "Grocery & Food", location: { city: "London", postcode: "W10 5BE" }, contact: { phone: "020 8901 2345" }, image: "https://images.unsplash.com/photo-1609501676725-7186f0b4c4b8?w=400", country: "Mauritania" },

  // Chadian Businesses
  { name: "N'Djamena Logistics", description: "Freight and logistics services to Central Africa", category: "Logistics & Shipping", location: { city: "London", postcode: "E6 1LB" }, contact: { phone: "020 8012 3456" }, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", country: "Chad" },

  // Central African Republic Businesses
  { name: "Bangui Diamonds", description: "Ethical diamond sourcing and Central African gemstones", category: "Jewelry & Accessories", location: { city: "London", postcode: "WC1X 8BP" }, contact: { phone: "020 7123 4567" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "Central African Republic" },

  // Gabonese Businesses
  { name: "Libreville Wood Crafts", description: "Gabonese wood carvings, sculptures, and traditional crafts", category: "Arts & Crafts", location: { city: "London", postcode: "SE10 9GB" }, contact: { phone: "020 8234 5678" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Gabon" },

  // Equatorial Guinean Businesses
  { name: "Malabo Oil Services", description: "Oil industry consulting and equipment supply", category: "Industrial Services", location: { city: "London", postcode: "E14 5AB" }, contact: { phone: "020 7345 6789", website: "www.malabooil.co.uk" }, image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400", country: "Equatorial Guinea" },

  // Congolese Businesses (DRC)
  { name: "Kinshasa Music Studio", description: "Congolese music production, soukous, and rumba recordings", category: "Music & Entertainment", location: { city: "London", postcode: "N16 7HU" }, contact: { phone: "020 8456 7890" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Democratic Republic of Congo" },

  // Republic of Congo Businesses
  { name: "Brazzaville Cultural Exchange", description: "Cultural programs, French language classes, and community events", category: "Education & Culture", location: { city: "London", postcode: "SW4 7AA" }, contact: { phone: "020 8567 8901" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Republic of Congo" },

  // Angolan Businesses
  { name: "Luanda Portuguese School", description: "Portuguese language classes and Angolan cultural education", category: "Education & Culture", location: { city: "London", postcode: "W11 2BQ" }, contact: { phone: "020 7678 9012", website: "www.luandaportugueseschool.co.uk" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Angola" },

  // Namibian Businesses
  { name: "Windhoek Craft Beer", description: "Namibian beer import and African brewery products", category: "Food & Beverage", location: { city: "London", postcode: "SE1 2AA" }, contact: { phone: "020 7789 0123" }, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400", country: "Namibia" },

  // Botswanan Businesses
  { name: "Gaborone Diamonds", description: "Botswana diamond jewelry and precious stone trading", category: "Jewelry & Accessories", location: { city: "London", postcode: "W1K 6DJ" }, contact: { phone: "020 7890 1234", website: "www.gaboronediamonds.co.uk" }, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", country: "Botswana" },

  // Zambian Businesses
  { name: "Lusaka Copper Crafts", description: "Zambian copper artwork, sculptures, and traditional metalwork", category: "Arts & Crafts", location: { city: "Birmingham", postcode: "B11 1AR" }, contact: { phone: "0121 345 6789" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Zambia" },

  // Malawian Businesses
  { name: "Lilongwe Tea Company", description: "Premium Malawian tea blends and specialty teas", category: "Food & Beverage", location: { city: "London", postcode: "E1 6JE" }, contact: { phone: "020 8901 2345", email: "info@lilongwetea.co.uk" }, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", country: "Malawi" },

  // Mozambican Businesses
  { name: "Maputo Seafood", description: "Fresh Mozambican seafood, prawns, and Portuguese-African cuisine", category: "Restaurant", location: { city: "London", postcode: "E14 8AS" }, contact: { phone: "020 7012 3456" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", country: "Mozambique" },

  // Madagascan Businesses
  { name: "Antananarivo Vanilla", description: "Premium Madagascar vanilla beans and spice products", category: "Grocery & Food", location: { city: "London", postcode: "SW1A 1AA" }, contact: { phone: "020 8123 4567", website: "www.madagascarvanilla.co.uk" }, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", country: "Madagascar" },

  // Mauritian Businesses
  { name: "Port Louis Textiles", description: "Mauritian fabrics, saris, and multicultural fashion", category: "Fashion & Clothing", location: { city: "London", postcode: "E1 1DU" }, contact: { phone: "020 8234 5678" }, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", country: "Mauritius" },

  // Seychellois Businesses
  { name: "Victoria Coconut Products", description: "Seychelles coconut oil, coco de mer, and tropical products", category: "Beauty & Personal Care", location: { city: "London", postcode: "SW7 2AZ" }, contact: { phone: "020 7345 6789" }, image: "https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400", country: "Seychelles" },

  // Comorian Businesses
  { name: "Moroni Perfumes", description: "Traditional Comorian ylang-ylang perfumes and essential oils", category: "Beauty & Personal Care", location: { city: "London", postcode: "W1J 0BD" }, contact: { phone: "020 7456 7890" }, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400", country: "Comoros" },

  // Djiboutian Businesses
  { name: "Djibouti Logistics Hub", description: "Shipping and logistics services to the Horn of Africa", category: "Logistics & Shipping", location: { city: "London", postcode: "E16 2QU" }, contact: { phone: "020 8567 8901", email: "info@djiboutilogistics.co.uk" }, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", country: "Djibouti" },

  // Eritrean Businesses
  { name: "Asmara Coffee Roastery", description: "Traditional Eritrean coffee ceremony and premium coffee beans", category: "Food & Beverage", location: { city: "London", postcode: "N7 9DP" }, contact: { phone: "020 8678 9012" }, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400", country: "Eritrea" },

  // Sudanese Businesses
  { name: "Khartoum Spice Market", description: "Sudanese spices, hibiscus tea, and North African seasonings", category: "Grocery & Food", location: { city: "London", postcode: "SW8 2LP" }, contact: { phone: "020 7789 0123" }, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", country: "Sudan" },

  // South Sudanese Businesses
  { name: "Juba Community Center", description: "South Sudanese community support, education, and cultural programs", category: "Community Services", location: { city: "London", postcode: "SE15 1LE" }, contact: { phone: "020 8890 1234", email: "info@jubacommunity.org.uk" }, image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400", country: "South Sudan" },

  // Lesotho Businesses
  { name: "Maseru Blanket Company", description: "Traditional Basotho blankets and mountain kingdom textiles", category: "Fashion & Clothing", location: { city: "London", postcode: "SE5 0RJ" }, contact: { phone: "020 8901 2345" }, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400", country: "Lesotho" },

  // Swazi Businesses
  { name: "Mbabane Craft Market", description: "Swazi traditional crafts, wood carvings, and cultural artifacts", category: "Arts & Crafts", location: { city: "London", postcode: "W2 4RH" }, contact: { phone: "020 8012 3456" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Eswatini" },

  // Additional Nigerian Businesses
  { name: "Abuja Tech Solutions", description: "Software development and IT consulting services", category: "Technology", location: { city: "London", postcode: "EC1A 4HD" }, contact: { phone: "020 7111 2222", website: "www.abujatech.co.uk" }, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400", country: "Nigeria" },
  { name: "Yoruba Language School", description: "Yoruba language classes and Nigerian cultural education", category: "Education & Culture", location: { city: "Birmingham", postcode: "B12 8QH" }, contact: { phone: "0121 333 4444" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Nigeria" },
  { name: "Igbo Arts Gallery", description: "Traditional Igbo art, masks, and contemporary Nigerian artwork", category: "Arts & Crafts", location: { city: "Manchester", postcode: "M11 3EE" }, contact: { phone: "0161 555 6666" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Nigeria" },
  { name: "Hausa Leather Works", description: "Traditional Nigerian leather goods, bags, and accessories", category: "Fashion & Clothing", location: { city: "Leeds", postcode: "LS4 2AB" }, contact: { phone: "0113 777 8888" }, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", country: "Nigeria" },
  { name: "Nigerian Film Academy", description: "Nollywood film training and production services", category: "Entertainment", location: { city: "London", postcode: "W1T 1JH" }, contact: { phone: "020 7999 0000", website: "www.nollywoodacademy.co.uk" }, image: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400", country: "Nigeria" },

  // Additional Ghanaian Businesses
  { name: "Akan Drumming Circle", description: "Traditional Ghanaian drumming lessons and performances", category: "Music & Instruments", location: { city: "London", postcode: "SE8 4RG" }, contact: { phone: "020 8111 2222" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Ghana" },
  { name: "Twi Language Center", description: "Twi language classes and Ghanaian cultural programs", category: "Education & Culture", location: { city: "Birmingham", postcode: "B13 9RT" }, contact: { phone: "0121 333 5555" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", country: "Ghana" },
  { name: "Adinkra Symbol Art", description: "Traditional Adinkra symbols, prints, and Ghanaian art", category: "Arts & Crafts", location: { city: "Manchester", postcode: "M12 6HH" }, contact: { phone: "0161 666 7777" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", country: "Ghana" },
  { name: "Shea Butter Beauty", description: "Natural Ghanaian shea butter products and skincare", category: "Beauty & Personal Care", location: { city: "Liverpool", postcode: "L2 8JK" }, contact: { phone: "0151 888 9999" }, image: "https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400", country: "Ghana" },
  { name: "Highlife Music Studio", description: "Ghanaian highlife music recording and production", category: "Music & Entertainment", location: { city: "London", postcode: "N8 7PL" }, contact: { phone: "020 8000 1111" }, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", country: "Ghana" }
];

module.exports = sampleBusinesses;