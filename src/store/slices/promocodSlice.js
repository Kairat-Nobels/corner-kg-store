import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { promocodApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getPromocods = createAsyncThunk(
  "getPromocods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(promocodApi);
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

// CREATE
export const createPromocod = createAsyncThunk(
  "createPromocod",
  async (promocod, { rejectWithValue }) => {
    try {
      const response = await fetch(promocodApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promocod)
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

// UPDATE
export const updatePromocod = createAsyncThunk(
  "updatePromocod",
  async ({ id, promocod }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${promocodApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promocod)
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

// DELETE
export const deletePromocod = createAsyncThunk(
  "deletePromocod",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${promocodApi}/${id}`, {
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

const promocodSlice = createSlice({
  name: "promocodSlice",
  initialState: {
    promocods: [],
    loading: false,
    error: null,
    success: null,
    delLoading: false,
    delError: null,
    delMessage: null,
  },
  reducers: {
    clearPromocodMessages(state) {
      state.error = null;
      state.success = null;
      state.delError = null;
      state.delMessage = null;
    }
  },
  extraReducers: builder => {

    // GET
    builder.addCase(getPromocods.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPromocods.fulfilled, (state, action) => {
      state.loading = false;
      state.promocods = action.payload;
    });
    builder.addCase(getPromocods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // CREATE
    builder.addCase(createPromocod.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(createPromocod.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Промокод ийгиликтүү кошулду";
      state.promocods.unshift(action.payload);
      toast.success("Промокод ийгиликтүү кошулду");
    });
    builder.addCase(createPromocod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Промокодду кошууда ката кетти");
    });

    // UPDATE
    builder.addCase(updatePromocod.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(updatePromocod.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Промокод ийгиликтүү жаңыртылды";
      state.promocods = state.promocods.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      toast.success("Промокод ийгиликтүү жаңыртылды");
    });
    builder.addCase(updatePromocod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Промокодду жаңыртууда ката кетти");
    });

    // DELETE
    builder.addCase(deletePromocod.pending, (state) => {
      state.delLoading = true;
      state.delError = null;
      state.delMessage = null;
    });
    builder.addCase(deletePromocod.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delMessage = "Промокод ийгиликтүү өчүрүлдү";
      state.promocods = state.promocods.filter(item => item.id !== action.payload);
      toast.success("Промокод ийгиликтүү өчүрүлдү");
    });
    builder.addCase(deletePromocod.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
      toast.error("Промокодду өчүрүүдө ката кетти");
    });
  }
});

export const { clearPromocodMessages } = promocodSlice.actions;

export default promocodSlice.reducer;
