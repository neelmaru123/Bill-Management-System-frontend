import { Outlet } from "react-router-dom";
import React from "react";
import Example from "./heading";

function HomeLayout() {
    return (
        <>
            <Example />
            <Outlet />
        </>
    )
}

export default HomeLayout;

