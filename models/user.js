import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
export default mongoose.model('User', userSchema);
