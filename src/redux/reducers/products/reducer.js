import types from "../../actions/products/types";

const init = {
    data: {
        loading: false,
        data: [],
    },
};

export function fetchProductDataList(store = init, action) {
    switch (action.type) {
        case types.GET_DATA_LOADING:
            console.log("loadi", store)
            return {
                ...store,
                data: {
                    ...store.data,
                    loading: true,
                },
            };
        case types.FETCH_PRODUCT_DATA_SUCCESS:
            console.log("success", store)
            return {
                ...store,
                data: {
                    ...store.data,
                    loading: false,
                    data: action.payload,
                },
            };

        default:
            return {
                ...store
            }
    }
};