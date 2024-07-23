import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster";

function NoLayout() {
    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}

export default NoLayout;
