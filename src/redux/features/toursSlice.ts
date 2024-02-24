import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Tour } from "@/types/Tour";

type initialState = {
    isLoading: boolean,
    tours: Tour[] | [],
    error: boolean
}

const initialState: initialState = {
    isLoading: false,
    tours: [],
    error: false
}

export const fetchTours = createAsyncThunk('tours/fecthTours',
    async () => {
        try {
            const response = await fetch('/api/tours');
            const { tours, status } = await response.json();
            if (status === 201) {
                return tours;
            } else {
                return [];
            }
        } catch (e) {
            console.log(e);
            return [];
        }
    })


export const createNewTour = createAsyncThunk('tours/createNewTour',
    async (tour: Tour) => {
        try {
            const response = await fetch('./api/createNewTour', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newTour: tour })
            });

            const { createdTour }: { createdTour: Tour | null } = await response.json();
            return createdTour;

        } catch (e) {
            console.log(e);
            return null;
        }
    })

const toursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTours.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchTours.fulfilled, (state, { payload }: { payload: Tour[] | undefined }) => {
            state.isLoading = false;
            if (payload) {
                state.tours = [...payload];
            }
        });

        builder.addCase(fetchTours.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });

        builder.addCase(createNewTour.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(createNewTour.fulfilled, (state, { payload }: { payload: Tour | null }) => {
            state.isLoading = false;
            if (payload) {
                state.tours = [...state.tours, payload];
            }
        });

        builder.addCase(createNewTour.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    },
});

export default toursSlice.reducer;