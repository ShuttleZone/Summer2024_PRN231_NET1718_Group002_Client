import {RootState, useAppDispatch} from "@/store";
import {setCallback} from "@/store/slices/callback.slice";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";

interface PrivateRouteProps {
    allowedRoles?: string[];
}

function PrivateRoute({allowedRoles}: PrivateRouteProps) {
    const {isAuthenticated, isLoading, role} = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) dispatch(setCallback(location.pathname));
    }, [isAuthenticated, isLoading, dispatch, location]);

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

    return isAuthenticated ? (
        allowedRoles?.includes(role || "") ? (
            <Outlet />
        ) : (
            <Navigate to="/unauthorized" replace />
        )
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateRoute;
