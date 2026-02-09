import apiFactory from "../lib/axios";
import { API_ENDPOINTS } from "../lib/axios";

const fetchRecipes = async () => {
  try {
    const response = await apiFactory.get(API_ENDPOINTS.RECIPES);
    //console.log(API_ENDPOINTS.RECIPES)
    return response.data?.recipes || response.data || [];
  } catch (error) {
    console.error("FetchRecipesError", error);
    throw error;
  }
};

export default fetchRecipes;
