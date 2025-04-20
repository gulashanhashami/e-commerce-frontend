import types from "./types";

export function getProductDataLoading(payload) {
    return {
        type: types.GET_DATA_LOADING,
      };
}

export function getProductDataSuccess(payload) {
    return {
        type: types.FETCH_PRODUCT_DATA_SUCCESS,
        payload,
      };
}