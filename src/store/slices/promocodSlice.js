import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { promocodApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getPromocods = createAsyncThunk(
  "promocods/getPromocods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(promocodApi);

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
export const createPromocod = createAsyncThunk(
  "promocods/createPromocod",
  async (promocod, { rejectWithValue }) => {
    try {
      const response = await fetch(promocodApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promocod),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error("Промокод кошууда ката кетти");
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updatePromocod = createAsyncThunk(
  "promocods/updatePromocod",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${promocodApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error("Промокодду жаңыртууда ката кетти");
      return rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deletePromocod = createAsyncThunk(
  "promocods/deletePromocod",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${promocodApi}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return id;
    } catch (error) {
      toast.error("Промокодду өчүрүүдө ката кетти");
      return rejectWithValue(error.message);
    }
  }
);

const promocodSlice = createSlice({
  name: "promocods",
  initialState: {
    promocods: [],
    loading: false,
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getPromocods.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPromocods.fulfilled, (state, action) => {
        state.loading = false;
        state.promocods = action.payload;
      })
      .addCase(getPromocods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createPromocod.fulfilled, (state, action) => {
        state.promocods.unshift(action.payload);
        toast.success("Промокод ийгиликтүү кошулду");
      })

      // UPDATE
      .addCase(updatePromocod.fulfilled, (state, action) => {
        state.promocods = state.promocods.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        toast.success("Промокод ийгиликтүү жаңыртылды");
      })

      // DELETE
      .addCase(deletePromocod.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deletePromocod.fulfilled, (state, action) => {
        state.deleting = false;
        state.promocods = state.promocods.filter(
          (item) => item.id !== action.payload
        );
        toast.success("Промокод өчүрүлдү");
      });
  },
});

export default promocodSlice.reducer;
