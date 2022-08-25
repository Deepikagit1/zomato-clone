import React from "react";
import QuickSearch from "./QuickSearch";
import Wallpaper from "./Wallpaper";

function Homepage(){
    return (
        <>
        <main className="container-fluid p-lg-0 px-5 px-sm-5 main">
            <Wallpaper/>
            <QuickSearch/>
        </main>
        </>
    )
}

export default Homepage;