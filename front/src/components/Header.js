import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <header>
            <h1>Oficina 5</h1>
            <Link to="/posts">
                Posts
            </Link>
        </header>
    )
}