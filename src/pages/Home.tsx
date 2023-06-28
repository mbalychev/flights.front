import React from "react"
import { Link } from "react-router-dom"
import imgAirport from "../images/airport.jpeg"
import { Col, Row, Table } from "antd"
import Title from "antd/es/typography/Title"

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
                    <Title level={3}>Home</Title>
                    <Link to={'/flights'}>
                        Организации
                    </Link>
                </Col>
            </Row>
        </div>
    )
}