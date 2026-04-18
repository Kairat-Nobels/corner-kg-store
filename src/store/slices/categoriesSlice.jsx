import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi);

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
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error("Ошибка при добавлении категории");
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error("Ошибка при обновлении категории");
      return rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return id;
    } catch (error) {
      toast.error("Ошибка при удалении категории");
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        toast.success("Категория добавлена");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }

        toast.success("Категория обновлена");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Категория удалена");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;