import {RootState, useAppDispatch} from "@/store";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

function PrivateRoute() {
    const {isAuthenticated, isLoading} = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useAppDispatch();

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
