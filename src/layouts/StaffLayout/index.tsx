import {Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function StaffLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default StaffLayout;
