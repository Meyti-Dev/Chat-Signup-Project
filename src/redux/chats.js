import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getChats = createAsyncThunk("/chats", async () => {
    const response = await axios.get("http://localhost:4000/chats");
    return response.data;
});

const chats = createSlice({
    name: "chats",
    initialState: {
        chats: null,
        currentUserChats: null,
    },
    reducers: {
        filter: (state, { payload }) => {
            state.chats = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChats.fulfilled, (state, { payload }) => {
            state.chats = payload;
        });
    },
});

// create actions
export const { filter } = chats.actions;

// select values
export const selectChats = (state) => state.chats;

// export values
export default chats.reducer;
