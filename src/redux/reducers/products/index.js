import { combineReducers } from "redux";
import { fetchProductDataList } from "./reducer";

const productData = combineReducers({
    fetchProductDataList,
});

export default productData;