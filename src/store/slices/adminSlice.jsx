import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminApi } from "../../api/api"; // путь к вашему api файлу

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(adminApi);
            const data = await res.json();
            const user = data.find(
                u => u.login === login && u.password.toString() === password
            );

            if (!user) {
                toast.error('Логин же сырсөз туура эмес');
                return rejectWithValue('Маалымат туура эмес');
            }

            toast.success('Ийгиликтүү кирдиңиз!');
            localStorage.setItem('admin', 'true');
            return true;
        } catch (err) {
            toast.error('Серверде ката кетти');
            return rejectWithValue(err.message);
        }
    }
);

export const outAdmin = createAsyncThunk('admin/logout', async () => {
    localStorage.removeItem('admin');
    toast.success('Системадан чыктыңыз');
    return false;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        valid: localStorage.getItem('admin') === 'true',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginAdmin.fulfilled, state => {
                state.valid = true;
            })
            .addCase(loginAdmin.rejected, state => {
                state.valid = false;
            })
            .addCase(outAdmin.fulfilled, state => {
                state.valid = false;
            });
    },
});

export default adminSlice.reducer;
