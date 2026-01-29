import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authService} from "@/src/services/AuthService";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authService.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/*Якщо користувач переключається між програмами*/
setupListeners(store.dispatch);


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
