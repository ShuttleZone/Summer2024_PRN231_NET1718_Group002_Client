import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer, {refreshToken, setLoading} from "./slices/auth.slice";
import spinnerReducer from "./slices/spinner.slice";
import commonApi, {rtkQueryErrorLogger} from "./common.api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import bookingStageReducer from "./slices/bookingStage.slice";
import clubCreateReducer from "./slices/club.slice";
import callbackReducer from "./slices/callback.slice";
import {setupListeners} from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    auth: authReducer,
    bookingStage: bookingStageReducer,
    spinner: spinnerReducer,
    [commonApi.reducerPath]: commonApi.reducer,
    clubCreate: clubCreateReducer,
    callback: callbackReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(commonApi.middleware)
            .concat(rtkQueryErrorLogger),
});

store.dispatch(setLoading(true));
store.dispatch(refreshToken());
setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
