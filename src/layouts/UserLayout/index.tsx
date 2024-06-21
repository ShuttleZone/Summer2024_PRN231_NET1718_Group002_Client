import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Spinner from "@/components/Spinner";
import {Toaster} from "@/components/ui/toaster";

function UserLayout() {
    return (
        <>
            <div className="h-screen flex flex-col relative">
                <Header />
                <main className="flex-grow h-fit">
                    <Hero />
                    <Outlet />
                </main>
                <Footer />
                <Spinner />
            </div>
            <Toaster />
        </>
    );
}

export default UserLayout;
