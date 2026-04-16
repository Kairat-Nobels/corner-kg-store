import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/api";
import { toast } from "react-toastify";

// Получить все категории
export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi);
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ката: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создать категорию
export const createCategories = createAsyncThunk(
  "createCategories",
  async (news, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 201) {
        return await response.json();
      } else {
        throw Error(`Ката: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Обновить категорию
export const updateCategories = createAsyncThunk(
  "updateCategories",
  async ({ id, news }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ката: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удалить категорию
export const deleteCategories = createAsyncThunk(
  "deleteCategories",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "DELETE"
      });
      if (response.status === 200) {
        return id;
      } else {
        throw Error(`Ката: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    success: null,
    delLoading: false,
    delError: null,
    delMessage: null,
  },
  reducers: {
    clearNewsMessages(state) {
      state.error = null;
      state.success = null;
      state.delError = null;
      state.delMessage = null;
    }
  },
  extraReducers: builder => {
    // Получение категорий
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Создание категории
    builder.addCase(createCategories.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Категория ийгиликтүү кошулду";
      state.categories.unshift(action.payload);
      toast.success("Категория ийгиликтүү кошулду");
    });
    builder.addCase(createCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Категорияны кошууда ката кетти");
    });

    // Обновление категории
    builder.addCase(updateCategories.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Категория ийгиликтүү жаңыртылды";
      state.categories = state.categories.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      toast.success("Категория ийгиликтүү жаңыртылды");
    });
    builder.addCase(updateCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Категорияны жаңыртууда ката кетти");
    });

    // Удаление категории
    builder.addCase(deleteCategories.pending, (state) => {
      state.delLoading = true;
      state.delError = null;
      state.delMessage = null;
    });
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delMessage = "Категория ийгиликтүү өчүрүлдү";
      state.categories = state.categories.filter(item => item.id !== action.payload);
      toast.success("Категория ийгиликтүү өчүрүлдү");
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload || "Өчүрүүдө ката кетти";
      toast.error(state.delError);
    });
  }
});

export const { clearNewsMessages } = categoriesSlice.actions;
export default categoriesSlice.reducer;
