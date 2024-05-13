import {RootState} from "@/store";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

function PrivateRoute() {
    const token = useSelector((state: RootState) => state.auth.token);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
