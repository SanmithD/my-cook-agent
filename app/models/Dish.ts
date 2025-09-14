import mongoose, { Document, Schema } from "mongoose";

export interface IDish extends Document {
  name: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  category: string;
}

const DishSchema = new Schema<IDish>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "all",
        "main-course",
        "dessert",
        "drinks",
        "appetizer",
        "salad",
        "soup",
        "snacks",
      ],
      default: "all",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Dish ||
  mongoose.model<IDish>("Dish", DishSchema);
