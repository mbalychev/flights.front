import React from "react";
import { Link } from "react-router-dom";

export const Layout = () => {
    return (<div>
        <Link to={'/flights'}>
            <Tab isTabActive={location.pathname.startsWith('/organizations')} color="#313b78">Организации</Tab>
        </Link>
    </div>
    )
}