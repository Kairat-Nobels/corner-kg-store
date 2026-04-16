import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemsApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getItems = createAsyncThunk(
    "getItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(itemsApi);
            if (!response.ok) throw new Error(`Ката: ${response.status}`);
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createItem = createAsyncThunk(
    "createItem",
    async (newDoctor, { rejectWithValue }) => {
        try {
            const response = await fetch(itemsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDoctor),
            });
            if (!response.ok) throw new Error(`Ката: ${response.status}`);
            return await response.json();
        } catch (error) {
            toast.error("Товарды кошууда ката кетти");
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE
export const updateItem = createAsyncThunk(
    "updateItem",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${itemsApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error(`Ката: ${response.status}`);
            return await response.json();
        } catch (error) {
            toast.error("Товарды жаңыртууда ката кетти");
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteItem = createAsyncThunk(
    "deleteItem",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${itemsApi}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error(`Ката: ${response.status}`);
            return id;
        } catch (error) {
            toast.error("Товарды өчүрүүдө ката кетти");
            return rejectWithValue(error.message);
        }
    }
);

const itemsSlice = createSlice({
    name: "itemsSlice",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            // GET
            .addCase(getItems.pending, state => {
                state.loading = true;
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
            .addCase(createItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
                toast.success("Ийгиликтүү кошулду");
            })

            // UPDATE
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                toast.success("Ийгиликтүү жаңыртылды");
            })

            // DELETE
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(doc => doc.id !== action.payload);
                toast.success("Ийгиликтүү өчүрүлдү");
            })

            // Ошибка
            .addMatcher(
                action => action.type.endsWith("rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default itemsSlice.reducer;
