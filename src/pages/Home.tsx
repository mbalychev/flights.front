import React from "react"
import { Link } from "react-router-dom"
import imgAirport from "../images/airport.jpeg"
import { Col, Row, Table } from "antd"

const colFirstStyle: React.CSSProperties = {
    padding: '20px'
}
const imgStyle: React.CSSProperties = {
    borderRadius: '10px',
    width: '100%'
}

export const Home = () => {
    return (
        <div>
            <Row>
                <Col span={6} style={colFirstStyle}>
                    <img src={imgAirport} style={imgStyle} />
                </Col>
                <Col span={18}>
                    <h2>Home</h2>
                    <Link to={'/flights'}>
                        Организации
                    </Link>
                </Col>
            </Row>
        </div>
    )
}