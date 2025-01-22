import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interface/categoryInerface";

const CategorySchema : Schema = new Schema (
    {
        gigCategory: { type: String, required: true, unique: true },
    },
    { timestamps: true }
)

const Category = mongoose.model <ICategory> ('Category',CategorySchema);
export default Category;