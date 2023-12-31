import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

export default mongoose.model('Recipe', recipeSchema);
