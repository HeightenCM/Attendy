// eslint-disable-next-line no-unused-vars
import React from "react";
import { disconnect } from "../services/authService";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return(
        <nav className="navbar navbar-expand-lg navbar-darj bg-dark position-absolute justify-content-end">
            <div className="nav-item">
                <button className="btn btn-danger ms-3" onClick={()=>{disconnect();navigate('/');}}>Disconnect</button>
            </div>

        </nav>
    )
}

export default NavBar