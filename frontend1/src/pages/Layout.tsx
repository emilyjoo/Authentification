import { Outlet } from "react-router-dom";
import { Navbar } from "@/pages/Navbar";
import {Footer} from "@/components/Footer";

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};