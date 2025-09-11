import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [String],
    steps: [String],
    image: String
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);