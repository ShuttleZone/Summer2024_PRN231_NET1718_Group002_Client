import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import spinnerReducer from "./slices/spinner.slice";
import commonApi from "./common.api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import bookingStageReducer from "./bookingStage.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    bookingStage: bookingStageReducer,
    spinner: spinnerReducer,
    [commonApi.reducerPath]: commonApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(commonApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
