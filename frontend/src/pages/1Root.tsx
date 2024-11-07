import { Outlet } from "react-router-dom";
import MainNav from "../components/layout/MainNav";

function Root() {
    return (
        <>
            <div className='h-screen'>
                <MainNav />
                <Outlet />
            </div>
            <div className='h-screen'></div>
        </>
    );
}

export default Root;