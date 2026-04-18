import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemsApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getItems = createAsyncThunk(
    "items/getItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(itemsApi);

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
export const createItem = createAsyncThunk(
    "items/createItem",
    async (newItem, { rejectWithValue }) => {
        try {
            const response = await fetch(itemsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            toast.error("Ошибка при добавлении товара");
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE
export const updateItem = createAsyncThunk(
    "items/updateItem",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${itemsApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            toast.error("Ошибка при обновлении товара");
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteItem = createAsyncThunk(
    "items/deleteItem",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${itemsApi}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return id;
        } catch (error) {
            toast.error("Ошибка при удалении товара");
            return rejectWithValue(error.message);
        }
    }
);

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                toast.success("Товар успешно добавлен");
            })
            .addCase(createItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }

                toast.success("Товар успешно обновлен");
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
                toast.success("Товар успешно удален");
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default itemsSlice.reducer;
