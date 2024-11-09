import React from "react";
import WalletButton from "./walletButton";
import {NavLink} from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <div className="flex justify-between bg-[#2D2D2D] p-4 mx-4 items-center rounded-md">
                <NavLink  to = '/' className="text-3xl text-white font-semibold">DocBlock</NavLink>
                <div className="flex justify-between gap-x-10 text-white text-xl">
                    <NavLink to='/upload'>Upload Docs</NavLink>
                    <NavLink to='/identity'>Identity</NavLink>
                </div>
                <div><WalletButton/></div>
            </div>
        </nav>
    )
}

export default NavBar;