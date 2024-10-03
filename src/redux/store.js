import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import chatsReducer from "./chats";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        chats: chatsReducer,
    },
});
