export const getRecipeById = (id) => {
  const recipe = allRecipes.find(r => r.id === parseInt(id));
  if (!recipe) return null;

  // Add additional details for the recipe
  return {
    ...recipe,
    instructions: `
      1. Prepare all ingredients
      2. Follow basic cooking steps
      3. Cook until done
      4. Serve and enjoy!
    `,
    extendedIngredients: [
      { id: 1, original: "2 cups all-purpose flour" },
      { id: 2, original: "1 cup water" },
      { id: 3, original: "1 tablespoon olive oil" },
      { id: 4, original: "Salt to taste" }
    ],
    diets: ["vegetarian", "dairy-free"],
  };
};

export const allRecipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "A traditional Italian pizza with fresh mozzarella, tomatoes, and basil"
  },
  {
    id: 2,
    title: "Homemade Sushi Rolls",
    image: "https://spoonacular.com/recipeImages/2-556x370.jpg",
    readyInMinutes: 45,
    servings: 4,
    summary: "Fresh and delicious sushi rolls with rice, nori, and your choice of fillings"
  },
  {
    id: 3,
    title: "Creamy Mushroom Risotto",
    image: "https://spoonacular.com/recipeImages/3-556x370.jpg",
    readyInMinutes: 40,
    servings: 4,
    summary: "Rich and creamy Italian risotto with mushrooms and parmesan"
  },
  {
    id: 4,
    title: "Grilled Salmon with Lemon",
    image: "https://spoonacular.com/recipeImages/4-556x370.jpg",
    readyInMinutes: 25,
    servings: 2,
    summary: "Perfectly grilled salmon with fresh lemon and herbs"
  },
  {
    id: 5,
    title: "Chocolate Lava Cake",
    image: "https://spoonacular.com/recipeImages/5-556x370.jpg",
    readyInMinutes: 20,
    servings: 2,
    summary: "Decadent chocolate cake with a gooey molten center"
  },
  {
    id: 6,
    title: "Greek Salad",
    image: "https://spoonacular.com/recipeImages/6-556x370.jpg",
    readyInMinutes: 15,
    servings: 4,
    summary: "Fresh Mediterranean salad with feta cheese and olives"
  },
  {
    id: 7,
    title: "Beef Stir Fry",
    image: "https://spoonacular.com/recipeImages/7-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Quick and easy beef stir fry with vegetables"
  },
  {
    id: 9,
    title: "Chicken Alfredo Pasta",
    image: "https://spoonacular.com/recipeImages/9-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Creamy pasta with grilled chicken and parmesan sauce"
  },
  {
    id: 10,
    title: "Berry Smoothie Bowl",
    image: "https://spoonacular.com/recipeImages/10-556x370.jpg",
    readyInMinutes: 10,
    servings: 1,
    summary: "Healthy smoothie bowl topped with fresh berries and granola"
  },
  {
    id: 11,
    title: "Homemade Tacos",
    image: "https://spoonacular.com/recipeImages/11-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Authentic Mexican tacos with your choice of filling"
  },
  {
    id: 12,
    title: "French Toast",
    image: "https://spoonacular.com/recipeImages/12-556x370.jpg",
    readyInMinutes: 20,
    servings: 2,
    summary: "Classic breakfast French toast with maple syrup"
  },
  {
    id: 13,
    title: "Vegetable Lasagna",
    image: "https://spoonacular.com/recipeImages/13-556x370.jpg",
    readyInMinutes: 60,
    servings: 6,
    summary: "Layered pasta with vegetables and rich tomato sauce"
  },
  {
    id: 14,
    title: "Shrimp Scampi",
    image: "https://spoonacular.com/recipeImages/14-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Garlic butter shrimp with white wine sauce"
  },
  {
    id: 16,
    title: "Vegetarian Buddha Bowl",
    image: "https://spoonacular.com/recipeImages/16-556x370.jpg",
    readyInMinutes: 25,
    servings: 2,
    summary: "Healthy bowl with quinoa, roasted vegetables, and tahini dressing"
  },
  {
    id: 17,
    title: "Spicy Pad Thai",
    image: "https://spoonacular.com/recipeImages/17-556x370.jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Traditional Thai noodles with tofu, shrimp, and peanuts"
  },
  {
    id: 18,
    title: "Homemade Ice Cream",
    image: "https://spoonacular.com/recipeImages/18-556x370.jpg",
    readyInMinutes: 240,
    servings: 8,
    summary: "Creamy vanilla ice cream made from scratch"
  },
  {
    id: 19,
    title: "Mediterranean Quinoa Bowl",
    image: "https://spoonacular.com/recipeImages/19-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Healthy quinoa bowl with chickpeas, vegetables, and feta"
  },
  {
    id: 20,
    title: "Classic Beef Burger",
    image: "https://spoonacular.com/recipeImages/20-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Juicy homemade beef burgers with all the toppings"
  },
  {
    id: 21,
    title: "Chicken Tikka Masala",
    image: "https://spoonacular.com/recipeImages/21-556x370.jpg",
    readyInMinutes: 45,
    servings: 6,
    summary: "Creamy Indian curry with tender chicken pieces"
  },
  {
    id: 22,
    title: "Vegan Chocolate Brownies",
    image: "https://spoonacular.com/recipeImages/22-556x370.jpg",
    readyInMinutes: 40,
    servings: 12,
    summary: "Rich and fudgy brownies made without dairy or eggs"
  },
  {
    id: 23,
    title: "Seafood Paella",
    image: "https://spoonacular.com/recipeImages/23-556x370.jpg",
    readyInMinutes: 55,
    servings: 6,
    summary: "Spanish rice dish with mixed seafood and saffron"
  },
  {
    id: 25,
    title: "Pesto Pasta with Cherry Tomatoes",
    image: "https://spoonacular.com/recipeImages/25-556x370.jpg",
    readyInMinutes: 20,
    servings: 4,
    summary: "Fresh basil pesto pasta with roasted cherry tomatoes"
  },
  {
    id: 26,
    title: "Korean BBQ Beef",
    image: "https://spoonacular.com/recipeImages/26-556x370.jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Marinated Korean-style beef with rice and vegetables"
  },
  {
    id: 27,
    title: "Apple Cinnamon Oatmeal",
    image: "https://spoonacular.com/recipeImages/27-556x370.jpg",
    readyInMinutes: 15,
    servings: 2,
    summary: "Warm and comforting oatmeal with fresh apples and cinnamon"
  },
  {
    id: 28,
    title: "Mushroom and Spinach Quiche",
    image: "https://spoonacular.com/recipeImages/28-556x370.jpg",
    readyInMinutes: 50,
    servings: 8,
    summary: "Savory pie with mushrooms, spinach, and cheese filling"
  },
  {
    id: 29,
    title: "Lemon Garlic Shrimp Pasta",
    image: "https://spoonacular.com/recipeImages/29-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Light and fresh pasta with garlic shrimp and lemon"
  },
  {
    id: 30,
    title: "Homemade Pizza Dough",
    image: "https://spoonacular.com/recipeImages/30-556x370.jpg",
    readyInMinutes: 90,
    servings: 4,
    summary: "Basic pizza dough recipe for perfect homemade pizzas"
  },
  {
    id: 31,
    title: "Mango Sticky Rice",
    image: "https://spoonacular.com/recipeImages/31-556x370.jpg",
    readyInMinutes: 45,
    servings: 4,
    summary: "Sweet Thai dessert with fresh mango and coconut sticky rice"
  },
  {
    id: 32,
    title: "Butternut Squash Soup",
    image: "https://spoonacular.com/recipeImages/32-556x370.jpg",
    readyInMinutes: 40,
    servings: 6,
    summary: "Creamy roasted butternut squash soup with warm spices"
  },
  {
    id: 33,
    title: "Falafel Wrap",
    image: "https://spoonacular.com/recipeImages/33-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Crispy falafel with tahini sauce and fresh vegetables in a warm pita"
  },
  {
    id: 34,
    title: "Teriyaki Glazed Salmon",
    image: "https://spoonacular.com/recipeImages/34-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Pan-seared salmon with homemade teriyaki sauce and steamed rice"
  },
  {
    id: 35,
    title: "Caprese Stuffed Chicken",
    image: "https://spoonacular.com/recipeImages/35-556x370.jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Chicken breast stuffed with mozzarella, tomatoes, and fresh basil"
  },
  {
    id: 36,
    title: "Sweet Potato Black Bean Tacos",
    image: "https://spoonacular.com/recipeImages/36-556x370.jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Vegetarian tacos with roasted sweet potatoes and spiced black beans"
  },
  {
    id: 37,
    title: "Lemon Blueberry Pancakes",
    image: "https://spoonacular.com/recipeImages/37-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Fluffy pancakes with fresh blueberries and lemon zest"
  },
  {
    id: 38,
    title: "Eggplant Parmesan",
    image: "https://spoonacular.com/recipeImages/38-556x370.jpg",
    readyInMinutes: 60,
    servings: 6,
    summary: "Breaded eggplant slices with marinara sauce and melted mozzarella"
  },
  {
    id: 39,
    title: "Coconut Curry Lentil Soup",
    image: "https://spoonacular.com/recipeImages/39-556x370.jpg",
    readyInMinutes: 40,
    servings: 6,
    summary: "Hearty lentil soup with coconut milk and warming curry spices"
  },
  {
    id: 40,
    title: "Orange Chicken",
    image: "https://spoonacular.com/recipeImages/40-556x370.jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Crispy chicken pieces in a sweet and tangy orange sauce"
  },
  {
    id: 41,
    title: "Mediterranean Grilled Vegetables",
    image: "https://spoonacular.com/recipeImages/41-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Colorful grilled vegetables with herbs and balsamic glaze"
  },
  {
    id: 42,
    title: "Tiramisu",
    image: "https://spoonacular.com/recipeImages/42-556x370.jpg",
    readyInMinutes: 30,
    servings: 8,
    summary: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream"
  },
  {
    id: 43,
    title: "Black Bean Quinoa Bowl",
    image: "https://spoonacular.com/recipeImages/43-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Protein-rich bowl with quinoa, black beans, avocado, and lime dressing"
  },
  {
    id: 44,
    title: "Garlic Butter Shrimp Linguine",
    image: "https://spoonacular.com/recipeImages/44-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Linguine pasta with garlic butter shrimp and fresh parsley"
  },
  {
    id: 45,
    title: "Maple Glazed Brussels Sprouts",
    image: "https://spoonacular.com/recipeImages/45-556x370.jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Roasted Brussels sprouts with maple syrup and crispy bacon"
  }
];

// Keep the first 6 recipes as featured recipes
export const featuredRecipes = allRecipes.slice(0, 6);
