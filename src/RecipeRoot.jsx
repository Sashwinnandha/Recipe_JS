import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function RecipeRoot(){

    const data=useSelector(state=>state.validate.isAuth);

    return(
       <>
        {data?(<>
            <Navbar/>
            <Outlet/>
            </>):<><Navigate to="/" /></>}</>
    )
}