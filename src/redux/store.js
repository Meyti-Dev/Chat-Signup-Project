import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
// import { messagesReducer } from "./messages";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        // messages: messagesReducer,
    },
});
