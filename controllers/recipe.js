import '../models/recipe.js';
import Recipe from '../models/recipe.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const allRecipes = await Recipe.find();

            if (allRecipes.length > 0) {
                return res
                    .status(200)
                    .json({ success: true, recipes: allRecipes });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: `No recipes found` });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const oneRecipe = await Recipe.findOne({ _id: id });
            if (oneRecipe) {
                return res.status(200).json({ success: true, recipe: oneRecipe });
            } else {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: `No recipe with id:${id} found `
                    });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    postRecipe: async (req, res) => {
        const { name, description } = req.body;
        try {
            if (!name || !description) {
                return res
                    .status(400)
                    .json({ success: false, message: `all felids require...` });
            }
            const postRecipe = await Recipe.create({ name, description });
            return res
                .status(200)
                .json({ success: true, newRecipe: postRecipe });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const updateRecipe = await Recipe.updateOne(
                { _id: id },
                { name, description }
            );

            if (updateRecipe.modifiedCount > 0) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: `Recipe with id:${id} updated successfully...`
                    });
            } else {
                return res
                    .status(404)
                    .json({ success: true, message: `Recipe not found...` });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRecipe = await Recipe.deleteOne({ _id: id });
            console.log(deletedRecipe);

            if (deletedRecipe.deletedCount > 0) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: `Recipe with id:${id} deleted successfully...`
                    });
            } else {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: `Recipe with id:${id} not found`
                    });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
};

export default recipeControllers;
