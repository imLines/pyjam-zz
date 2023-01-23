import { Outlet } from "react-router-dom";
import NavbarMobile from "./partials/navbar/NavbarMobile/NavbarMobile";

function Customer(){
    return(
        <>
            <NavbarMobile/>
            <Outlet/>
            
        </>
    )
};

export default Customer;