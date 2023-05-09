import { Outlet } from "react-router-dom";
import Header from "../Header";


const Layout = () => {
    return (
        <div>
            <Header/>
            <div className="container mx-auto min-h-full">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;