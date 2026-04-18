import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { reviewsApi } from "../../api/api";

// GET
export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(reviewsApi);

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
export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (newReview, { rejectWithValue }) => {
        try {
            const response = await fetch(reviewsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            toast.error("Ошибка при отправке отзыва");
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (reviewId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${reviewsApi}/${reviewId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            return reviewId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        loading: false,
        deleting: false,
        error: null,
        success: null,
    },
    reducers: {
        clearReviewMessages(state) {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Отзыв успешно отправлен";
                state.reviews.unshift(action.payload);
                toast.success("Отзыв успешно добавлен");
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteReview.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.deleting = false;
                state.reviews = state.reviews.filter(
                    (item) => item.id !== action.payload
                );
                toast.success("Отзыв удален");
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload || "Ошибка при удалении отзыва";
                toast.error(state.error);
            });
    },
});

export const { clearReviewMessages } = reviewsSlice.actions;
export default reviewsSlice.reducer;
