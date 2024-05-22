import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function UserLayout() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow h-fit">
                <Hero />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default UserLayout;
