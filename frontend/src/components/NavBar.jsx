import { Button } from "bootstrap";
import { disconnect } from "../services/authService";
// eslint-disable-next-line no-unused-vars
import React from "react";

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-darj bg-dark">
            <NavBar.Text className="justify-content-end">
                <Button type="submit" onClick = {disconnect()}>Disconnect</Button>
            </NavBar.Text>
        </nav>
    )
}

export default NavBar