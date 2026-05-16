import taskReducer from './taskSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        task:taskReducer
    }
});