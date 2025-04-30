export interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  location: string;
  about: string;
  profileImage: string;
  averageRating: number;
  products: Product[];
  reviews: Review[];
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

export interface Review {
  id: string;
  farmerId: string;
  customerName: string;
  rating: number;
  text: string;
  timestamp: string;
}

// Mock farmers data
export const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    phoneNumber: '(555) 123-4567',
    location: '123 Farm Road, Greenville, CA',
    about: 'Family-owned farm specializing in organic vegetables and free-range eggs since 1985. We use sustainable farming practices and believe in providing the freshest produce to our community.',
    profileImage: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg',
    averageRating: 4.7,
    products: [],
    reviews: []
  },
  {
    id: '2',
    name: 'Sunshine Orchards',
    phoneNumber: '(555) 987-6543',
    location: '456 Orchard Lane, Sunnydale, CA',
    about: 'Specializing in stone fruits and apples, our orchard has been producing the juiciest fruits for over 30 years. We practice integrated pest management to minimize chemical use.',
    profileImage: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
    averageRating: 4.5,
    products: [],
    reviews: []
  },
  {
    id: '3',
    name: 'Hilltop Dairy',
    phoneNumber: '(555) 456-7890',
    location: '789 Dairy Drive, Hilltop, CA',
    about: 'Our family dairy farm focuses on high-quality milk, cheese, and yogurt from grass-fed cows. We prioritize animal welfare and sustainable farming practices.',
    profileImage: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
    averageRating: 4.8,
    products: [],
    reviews: []
  },
  {
    id: '4',
    name: 'Golden Honey Apiary',
    phoneNumber: '(555) 321-0987',
    location: '101 Bee Lane, Honeyville, CA',
    about: 'Producing artisanal honey and beeswax products. Our bees forage on local wildflowers, creating unique seasonal honey varieties. We also provide pollination services.',
    profileImage: 'https://images.pexels.com/photos/1174564/pexels-photo-1174564.jpeg',
    averageRating: 4.6,
    products: [],
    reviews: []
  },
  {
    id: '5',
    name: 'Fresh Meadows Ranch',
    phoneNumber: '(555) 234-5678',
    location: '202 Ranch Road, Meadowland, CA',
    about: 'Specializing in grass-fed beef and pasture-raised poultry. Our animals are raised without antibiotics or hormones. We practice rotational grazing to maintain healthy pastures.',
    profileImage: 'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg',
    averageRating: 4.9,
    products: [],
    reviews: []
  },
  {
    id: '6',
    name: 'Berry Good Farm',
    phoneNumber: '(555) 345-6789',
    location: '303 Berry Field, Berrytown, CA',
    about: 'Growing a variety of organic berries including strawberries, blueberries, and raspberries. We also make artisanal jams and preserves from our berries.',
    profileImage: 'https://images.pexels.com/photos/797670/pexels-photo-797670.jpeg',
    averageRating: 4.4,
    products: [],
    reviews: []
  }
];

// Mock products data
export const products: Product[] = [
  // Green Valley Farm (id: 1) products
  {
    id: 'p1',
    farmerId: '1',
    name: 'Organic Lettuce',
    description: 'Fresh, organic lettuce harvested daily. Perfect for salads and sandwiches.',
    price: 2.99,
    unit: 'head',
    image: 'https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg'
  },
  {
    id: 'p2',
    farmerId: '1',
    name: 'Free-Range Eggs',
    description: 'Eggs from our free-range chickens. Rich in flavor and nutrients.',
    price: 5.99,
    unit: 'dozen',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg'
  },
  {
    id: 'p3',
    farmerId: '1',
    name: 'Organic Kale',
    description: 'Nutrient-packed kale, perfect for smoothies, salads, or cooking.',
    price: 3.49,
    unit: 'bunch',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
  },
  
  // Sunshine Orchards (id: 2) products
  {
    id: 'p4',
    farmerId: '2',
    name: 'Honey Crisp Apples',
    description: 'Sweet and crisp apples, perfect for eating fresh or baking.',
    price: 4.99,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg'
  },
  {
    id: 'p5',
    farmerId: '2',
    name: 'Fresh Peaches',
    description: 'Juicy, tree-ripened peaches full of summer flavor.',
    price: 5.49,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg'
  },
  {
    id: 'p6',
    farmerId: '2',
    name: 'Organic Plums',
    description: 'Sweet, organic plums harvested at peak ripeness.',
    price: 4.49,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/70746/plums-fruit-sweet-fruits-70746.jpeg'
  },
  
  // Hilltop Dairy (id: 3) products
  {
    id: 'p7',
    farmerId: '3',
    name: 'Whole Milk',
    description: 'Fresh, creamy milk from our grass-fed cows. Pasteurized but not homogenized.',
    price: 4.99,
    unit: 'gallon',
    image: 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg'
  },
  {
    id: 'p8',
    farmerId: '3',
    name: 'Aged Cheddar',
    description: 'Sharp cheddar aged for 12 months. Rich, complex flavor.',
    price: 6.99,
    unit: '8 oz',
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg'
  },
  {
    id: 'p9',
    farmerId: '3',
    name: 'Greek Yogurt',
    description: 'Thick, creamy Greek yogurt. Available in plain and vanilla.',
    price: 3.99,
    unit: '16 oz',
    image: 'https://images.pexels.com/photos/4187772/pexels-photo-4187772.jpeg'
  },
  
  // Golden Honey Apiary (id: 4) products
  {
    id: 'p10',
    farmerId: '4',
    name: 'Wildflower Honey',
    description: 'Raw, unfiltered honey with a complex floral flavor profile.',
    price: 8.99,
    unit: '16 oz jar',
    image: 'https://images.pexels.com/photos/892507/pexels-photo-892507.jpeg'
  },
  {
    id: 'p11',
    farmerId: '4',
    name: 'Beeswax Candles',
    description: 'Hand-poured pure beeswax candles. Long-burning with a subtle honey scent.',
    price: 12.99,
    unit: 'pair',
    image: 'https://images.pexels.com/photos/278783/pexels-photo-278783.jpeg'
  },
  {
    id: 'p12',
    farmerId: '4',
    name: 'Beeswax Lip Balm',
    description: 'Moisturizing lip balm made with beeswax, honey, and essential oils.',
    price: 3.99,
    unit: 'tube',
    image: 'https://images.pexels.com/photos/6694066/pexels-photo-6694066.jpeg'
  },
  
  // Fresh Meadows Ranch (id: 5) products
  {
    id: 'p13',
    farmerId: '5',
    name: 'Grass-Fed Ground Beef',
    description: 'Lean ground beef from our grass-fed cattle. No antibiotics or hormones.',
    price: 8.99,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg'
  },
  {
    id: 'p14',
    farmerId: '5',
    name: 'Pasture-Raised Whole Chicken',
    description: 'Tender, flavorful chicken raised on pasture. Average 4-5 lbs.',
    price: 15.99,
    unit: 'each',
    image: 'https://images.pexels.com/photos/4251696/pexels-photo-4251696.jpeg'
  },
  {
    id: 'p15',
    farmerId: '5',
    name: 'Beef Jerky',
    description: 'Flavorful beef jerky made from our grass-fed cattle. Various flavors available.',
    price: 7.99,
    unit: '4 oz bag',
    image: 'https://images.pexels.com/photos/11131436/pexels-photo-11131436.jpeg'
  },
  
  // Berry Good Farm (id: 6) products
  {
    id: 'p16',
    farmerId: '6',
    name: 'Organic Strawberries',
    description: 'Sweet, juicy organic strawberries. Perfect for eating fresh or making desserts.',
    price: 6.99,
    unit: 'pint',
    image: 'https://images.pexels.com/photos/70746/plums-fruit-sweet-fruits-70746.jpeg'
  },
  {
    id: 'p17',
    farmerId: '6',
    name: 'Organic Blueberries',
    description: 'Plump, organic blueberries bursting with flavor and antioxidants.',
    price: 5.99,
    unit: 'pint',
    image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg'
  },
  {
    id: 'p18',
    farmerId: '6',
    name: 'Strawberry Jam',
    description: 'Small-batch jam made from our organic strawberries. No artificial ingredients.',
    price: 7.99,
    unit: '8 oz jar',
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'
  }
];

// Mock reviews data
export const reviews: Review[] = [
  // Green Valley Farm (id: 1) reviews
  {
    id: 'r1',
    farmerId: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    text: 'The organic vegetables from Green Valley Farm are the freshest I\'ve ever had! Their lettuce and kale are absolutely delicious.',
    timestamp: '2023-06-15T14:30:00Z'
  },
  {
    id: 'r2',
    farmerId: '1',
    customerName: 'Michael Brown',
    rating: 4,
    text: 'Great quality produce. The free-range eggs have such vibrant yolks. Will definitely buy again!',
    timestamp: '2023-07-02T10:15:00Z'
  },
  
  // Sunshine Orchards (id: 2) reviews
  {
    id: 'r3',
    farmerId: '2',
    customerName: 'Emily Wilson',
    rating: 5,
    text: 'The Honey Crisp apples are incredible! So crisp and sweet. Definitely worth a visit to Sunshine Orchards.',
    timestamp: '2023-09-10T16:45:00Z'
  },
  {
    id: 'r4',
    farmerId: '2',
    customerName: 'David Lee',
    rating: 4,
    text: 'Loved the peaches and plums. Very juicy and flavorful. Would have given 5 stars but a few peaches were slightly bruised.',
    timestamp: '2023-08-22T11:30:00Z'
  },
  
  // Hilltop Dairy (id: 3) reviews
  {
    id: 'r5',
    farmerId: '3',
    customerName: 'Jennifer Adams',
    rating: 5,
    text: 'Best dairy products in the area! The Greek yogurt is so creamy, and the aged cheddar has an amazing flavor. Highly recommend!',
    timestamp: '2023-07-15T09:20:00Z'
  },
  {
    id: 'r6',
    farmerId: '3',
    customerName: 'Robert Garcia',
    rating: 5,
    text: 'The whole milk tastes like milk should taste. My kids love it, and I appreciate knowing it comes from well-cared-for cows.',
    timestamp: '2023-08-05T13:40:00Z'
  },
  
  // Golden Honey Apiary (id: 4) reviews
  {
    id: 'r7',
    farmerId: '4',
    customerName: 'Amanda Martinez',
    rating: 4,
    text: 'The wildflower honey has such a unique and delicious flavor. I also bought the beeswax candles which burn beautifully.',
    timestamp: '2023-06-30T17:10:00Z'
  },
  {
    id: 'r8',
    farmerId: '4',
    customerName: 'Thomas Wilson',
    rating: 5,
    text: 'Amazing honey! You can really taste the difference in quality compared to store-bought. The lip balm is great too.',
    timestamp: '2023-07-25T15:55:00Z'
  },
  
  // Fresh Meadows Ranch (id: 5) reviews
  {
    id: 'r9',
    farmerId: '5',
    customerName: 'Lisa Thompson',
    rating: 5,
    text: 'The grass-fed beef is exceptional. So flavorful and you can tell it\'s raised with care. Worth every penny!',
    timestamp: '2023-08-11T12:15:00Z'
  },
  {
    id: 'r10',
    farmerId: '5',
    customerName: 'Kevin Phillips',
    rating: 5,
    text: 'We bought a whole chicken and it was the most flavorful chicken we\'ve ever had. Will definitely be back for more!',
    timestamp: '2023-09-05T14:25:00Z'
  },
  
  // Berry Good Farm (id: 6) reviews
  {
    id: 'r11',
    farmerId: '6',
    customerName: 'Catherine Lewis',
    rating: 4,
    text: 'Delicious berries! The strawberries were perfectly ripe and sweet. The jam is also incredible.',
    timestamp: '2023-07-08T10:50:00Z'
  },
  {
    id: 'r12',
    farmerId: '6',
    customerName: 'James Anderson',
    rating: 5,
    text: 'The blueberries were amazing - so plump and flavorful. Their strawberry jam is the best I\'ve ever had!',
    timestamp: '2023-08-17T16:30:00Z'
  }
];

// Initialize farmer products and reviews
export const initializeData = () => {
  // Add products to farmers
  farmers.forEach(farmer => {
    farmer.products = products.filter(product => product.farmerId === farmer.id);
  });
  
  // Add reviews to farmers
  farmers.forEach(farmer => {
    farmer.reviews = reviews.filter(review => review.farmerId === farmer.id);
  });
  
  return farmers;
};

// Function to get all products
export const getAllProducts = () => {
  return products;
};

// Function to get all farmers
export const getAllFarmers = () => {
  return initializeData();
};

// Function to get a farmer by ID
export const getFarmerById = (id: string) => {
  const farmer = farmers.find(f => f.id === id);
  if (farmer) {
    farmer.products = products.filter(product => product.farmerId === id);
    farmer.reviews = reviews.filter(review => review.farmerId === id);
  }
  return farmer;
};

// Function to search farmers by product name
export const searchFarmersByProduct = (query: string) => {
  const matchingProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
  
  const farmerIds = new Set(matchingProducts.map(product => product.farmerId));
  
  return Array.from(farmerIds).map(id => {
    const farmer = farmers.find(f => f.id === id);
    if (farmer) {
      const matchingProductsForFarmer = matchingProducts.filter(p => p.farmerId === id);
      return {
        ...farmer,
        matchingProducts: matchingProductsForFarmer
      };
    }
    return null;
  }).filter(Boolean);
};

// Function to add a review
export const addReview = (
  farmerId: string, 
  customerName: string, 
  rating: number, 
  text: string
) => {
  const newReview: Review = {
    id: `r${reviews.length + 1}`,
    farmerId,
    customerName,
    rating,
    text,
    timestamp: new Date().toISOString()
  };
  
  reviews.push(newReview);
  
  // Update farmer's reviews
  const farmer = farmers.find(f => f.id === farmerId);
  if (farmer) {
    farmer.reviews = [...farmer.reviews, newReview];
    
    // Recalculate average rating
    const totalRating = farmer.reviews.reduce((sum, review) => sum + review.rating, 0);
    farmer.averageRating = totalRating / farmer.reviews.length;
  }
  
  return newReview;
};

// Function to add a product
export const addProduct = (productData: Omit<Product, 'id'>) => {
  const newProduct: Product = {
    id: `p${products.length + 1}`,
    ...productData
  };
  
  products.push(newProduct);
  
  // Update farmer's products
  const farmer = farmers.find(f => f.id === productData.farmerId);
  if (farmer) {
    farmer.products = [...farmer.products, newProduct];
  }
  
  return newProduct;
};