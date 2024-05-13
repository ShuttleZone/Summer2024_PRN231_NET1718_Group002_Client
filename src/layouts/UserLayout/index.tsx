import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function UserLayout() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-yellow-500">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default UserLayout;
