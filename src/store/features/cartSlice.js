import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const itemInCart = state.cart.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
            );

            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeItem: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        // 🔥 ВОТ ЭТО ТЕБЕ НУЖНО
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem("cart");
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart, // ✅ теперь есть
} = cartSlice.actions;
