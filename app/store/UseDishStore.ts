import axios from "axios";
import { create } from "zustand";

type Recipe = {
    _id?: string;
    name: string;
    ingredients: string[];
    steps: string[];
}

type RecipeStore = {
    recipes: Recipe[];
    loading: boolean;
    fetchRecipe: ()=>Promise<void>;
    addRecipe: (recipe: Recipe) => Promise<void>;
}

export const UseDishStore = create<RecipeStore>((set, get) =>({
    recipes: [],
    loading: false,

    fetchRecipe: async() =>{
        set({ loading: true });
        try {
            const res = await axios.get('/api/dishes');
            set({ loading: false, recipes: res.data });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    addRecipe: async(recipe) =>{
        set({ loading: true });
        try {
            const res = await axios.post('/api/dishes',recipe);
            if(!res) throw new Error("Fail to add dish");
            set({ loading: false});
            await get().fetchRecipe();
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    }
}))