import {Navigate, useLocation} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "@/store";
import ContentSpinner from "@/components/ContentSpinner";

const UnauthenticatedRoute = () => {
    const {isAuthenticated, isLoading} = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <ContentSpinner />
            </div>
        );
    }

    const isAuthPath =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/oauth/gg";

    return isAuthenticated && isAuthPath ? (
        <Navigate to="/" replace />
    ) : (
        <Outlet />
    );
};

export default UnauthenticatedRoute;
