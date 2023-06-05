import React from "react";
import { Link } from "react-router-dom";

export const Layout = () => {
    return (<div>
        <Link to={'/flights'}>
            Организации
        </Link>
    </div>
    )
}