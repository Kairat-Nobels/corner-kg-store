import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminApi } from "../../api/api";

export const loginAdmin = createAsyncThunk(
    "admin/login",
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(adminApi);

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const data = await response.json();

            const user = data.find(
                (item) =>
                    item.login === login && item.password.toString() === password.toString()
            );

            if (!user) {
                toast.error("Неверный логин или пароль");
                return rejectWithValue("Неверные данные");
            }

            localStorage.setItem("admin", "true");
            localStorage.setItem("adminData", JSON.stringify(user));

            toast.success("Вход выполнен успешно");
            return user;
        } catch (error) {
            toast.error("Ошибка при входе в админку");
            return rejectWithValue(error.message);
        }
    }
);

export const outAdmin = createAsyncThunk("admin/logout", async () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminData");
    toast.success("Вы вышли из системы");
    return false;
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        valid: localStorage.getItem("admin") === "true",
        adminData: localStorage.getItem("adminData")
            ? JSON.parse(localStorage.getItem("adminData"))
            : null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.valid = true;
                state.adminData = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.valid = false;
                state.adminData = null;
                state.error = action.payload;
            })
            .addCase(outAdmin.fulfilled, (state) => {
                state.valid = false;
                state.adminData = null;
                state.error = null;
            });
    },
});

export default adminSlice.reducer;
