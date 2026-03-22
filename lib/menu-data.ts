export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Cheese Burger",
    description: "Juicy beef patty with melted cheese and fresh veggies",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    category: "Burgers",
  },
  {
    id: 2,
    name: "Veg Burger",
    description: "Crispy veggie patty with lettuce and special sauce",
    price: 149,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    category: "Burgers",
  },
  {
    id: 3,
    name: "Chicken Burger",
    description: "Grilled chicken breast with mayo and fresh toppings",
    price: 179,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
    category: "Burgers",
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Classic tomato sauce, mozzarella, and fresh basil",
    price: 299,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
    category: "Pizza",
  },
  {
    id: 5,
    name: "Farmhouse Pizza",
    description: "Loaded with fresh vegetables and herbs",
    price: 349,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    category: "Pizza",
  },
  {
    id: 6,
    name: "Cheese Burst Pizza",
    description: "Extra cheesy crust with premium toppings",
    price: 399,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    category: "Pizza",
  },
  {
    id: 7,
    name: "French Fries",
    description: "Crispy golden fries with seasoning",
    price: 99,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
    category: "Sides",
  },
  {
    id: 8,
    name: "Chicken Nuggets",
    description: "Crispy fried chicken nuggets with dipping sauce",
    price: 149,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
    category: "Sides",
  },
  {
    id: 9,
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    price: 79,
    image: "https://images.unsplash.com/photo-1619535860434-cf9b902a0a14?w=500",
    category: "Sides",
  },
  {
    id: 10,
    name: "Mango Shake",
    description: "Fresh mango blended with milk and ice cream",
    price: 129,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
    category: "Beverages",
  },
  {
    id: 11,
    name: "Cold Coffee",
    description: "Chilled coffee with ice cream and chocolate",
    price: 139,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    category: "Beverages",
  },
  {
    id: 12,
    name: "Pepsi",
    description: "Chilled carbonated soft drink",
    price: 49,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500",
    category: "Beverages",
  },
];
