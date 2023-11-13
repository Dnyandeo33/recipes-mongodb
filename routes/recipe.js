import express from 'express';
import recipeControllers from '../controllers/recipe.js';
import verifyToken from '../middleware/verifyToken.js';

const { getAllRecipes, getOneRecipe, postRecipe, updateRecipe, deleteRecipe } =
    recipeControllers;
const router = express.Router();

// routes
router.get('/', getAllRecipes);
router.get('/:id', getOneRecipe);
router.post('/', postRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
