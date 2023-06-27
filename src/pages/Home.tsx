import React from "react"
import { Link } from "react-router-dom"
import background from "../images/airport.jpeg"
import { Col, Row, Table } from "antd"
export const Home = () => {
    return (
        <div>

            <h2>Home</h2>
            <Link to={'/flights'}>
                Организации
            </Link>

        </div >
    )
}