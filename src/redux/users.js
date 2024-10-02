import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("/users", async () => {
    const response = await axios.get("http://localhost:4000/users");
    return response.data;
});

const users = createSlice({
    name: "users",
    initialState: {
        users: null,
        copyUsers: null,
    },
    reducers: {
        filter: (state, { payload }) => {
            state.copyUsers = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.users = payload;
            state.copyUsers = payload;
        });
    },
});

// create actions
export const { filter } = users.actions;

// select values
export const selectUsers = (state) => state.users;

// export values
export default users.reducer;
