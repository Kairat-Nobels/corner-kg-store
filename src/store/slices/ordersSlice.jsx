import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(ordersApi);

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (newOrder, { rejectWithValue }) => {
        try {
            const response = await fetch(ordersApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            toast.error("Ошибка при создании заказа");
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ordersApi}/${orderId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return orderId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE
export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ordersApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            toast.error("Ошибка при обновлении заказа");
            return rejectWithValue(error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        deleting: false,
        error: null,
        success: null,
    },
    reducers: {
        clearOrderMessages(state) {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Заказ успешно оформлен";
                state.orders.unshift(action.payload);
                toast.success("Заказ успешно создан");
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteOrder.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.deleting = false;
                state.orders = state.orders.filter((order) => order.id !== action.payload);
                toast.success("Заказ удален");
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Ошибка при удалении заказа";
                toast.error(state.error);
            })

            // UPDATE
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                );
                toast.success("Заказ обновлен");
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderMessages } = ordersSlice.actions;
export default ordersSlice.reducer;
