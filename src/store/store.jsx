import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cartSlice";
import { filterReducer } from "./features/filterSlice";
import ordersReducer from "./slices/ordersSlice";
import adminReducer from "./slices/adminSlice";
import reviewsReducer from "./slices/reviewsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import itemsReducer from "./slices/itemsSlice";
import promocodReducer from "./slices/promocodSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filterReducer,
        categoriesReducer,
        ordersReducer,
        reviewsReducer,
        adminReducer,
        itemsReducer,
        promocodReducer
    },
});