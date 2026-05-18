export const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: '4.8',
    deliveryTime: '20-30 min',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
    categories: ['Fast Food', 'Burgers'],
    menu: [
      { id: 'm1', name: 'Classic Cheeseburger', description: 'Beef patty, cheddar, lettuce, tomato, special sauce.', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=60' },
      { id: 'm2', name: 'Double Bacon Burger', description: 'Two beef patties, crispy bacon, cheddar, BBQ sauce.', price: 11.99, image: 'https://images.unsplash.com/photo-1594212202810-b98a1a3641b6?auto=format&fit=crop&w=150&q=60' },
    ],
  },
  {
    id: '2',
    name: 'Vegan Bites',
    rating: '4.9',
    deliveryTime: '25-40 min',
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60',
    categories: ['Vegan', 'Healthy'],
    menu: [
      { id: 'm3', name: 'Quinoa Salad Bowl', description: 'Quinoa, roasted veggies, avocado, lemon dressing.', price: 12.50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=60' },
      { id: 'm4', name: 'Vegan Wrap', description: 'Hummus, spinach, falafel, wrapped in whole wheat.', price: 9.50, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=150&q=60' },
    ],
  },
  {
    id: '3',
    name: 'Pizza Heaven',
    rating: '4.5',
    deliveryTime: '30-45 min',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60',
    categories: ['Italian', 'Pizza'],
    menu: [
      { id: 'm5', name: 'Margherita', description: 'Fresh tomatoes, mozzarella, basil.', price: 14.00, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=60' },
      { id: 'm6', name: 'Pepperoni', description: 'Classic pepperoni with extra cheese.', price: 16.00, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=150&q=60' },
    ],
  },
];

export const categories = ['All', 'Fast Food', 'Healthy', 'Vegan', 'Italian', 'Asian'];
