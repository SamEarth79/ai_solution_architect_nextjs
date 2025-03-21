import { createSlice } from "@reduxjs/toolkit";

interface AIState {
    showLoader: boolean;
    loaderText: string;
    showActionLoader: boolean;
    actionLoaderText: string;
}

const initialState: AIState = {
    showLoader: false,
    loaderText: "Loading...",
    showActionLoader: false,
    actionLoaderText: "Loading...",
}

const GeneralSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        showLoader(state, action){
            state.showLoader = true;
            state.loaderText = action.payload;
        },
        hideLoader(state){
            state.showLoader = false;
            state.loaderText = "Loading...";
        },
        showActionLoader(state, action){
            state.showActionLoader = true;
            state.actionLoaderText = action.payload;
        },
        hideActionLoader(state){
            state.showActionLoader = false;
            state.actionLoaderText = "Loading...";
        },
    }
});

export const GeneralActions = GeneralSlice.actions;
export const GeneralReducer = GeneralSlice.reducer;
