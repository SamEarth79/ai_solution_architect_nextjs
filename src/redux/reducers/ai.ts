import { createSlice } from "@reduxjs/toolkit";

interface AIState {
    history: [] | null;
}

const initialState: AIState = {
    history: [],
}

const AISlice = createSlice({
    name: "AI",
    initialState,
    reducers: {
        updateHistory(state, action){
            state.history?.push(action.payload);
        },
    }
});

export const AIActions = AISlice.actions;
export const AIReducer = AISlice.reducer;
