import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Flights } from './pages/flights/flights';
import { LayoutMenu } from './pages/LayoutMenu';
import { Bookings } from './pages/bookings/bookings';
import { Col, Row } from 'antd';
import background from "../src/images/airport.jpeg"
// import { Route } from 'react-router-dom';
export const links = {
    flight: (id: number) => `/flights/${id}`,
    // flights: () => navigate('/fligts')
}



export const Router = () => {

    return (
        <BrowserRouter>
            <LayoutMenu />
            <Row>
                <Col span={8}>
                    <div style={{ paddingLeft: '10%', marginTop: '20vh' }}>
                        <img src={background} style={{ width: '80%', borderRadius: '20px' }} />
                    </div>
                </Col>
                <Col
                    span={16}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                    <div style={{ padding: '5vh' }}>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="flights/*" element={<Flights />}>
                                <Route path="find" element={<Flights />} />
                                <Route path=":id" element={<Flights />} />
                            </Route>
                            <Route path="bookings/*" element={<Bookings />}>
                                <Route path="find" element={<Bookings />} />
                                <Route path=":id" element={<Bookings />} />
                            </Route>
                            {/* <Route path="/" element={<LayoutPage />}> */}
                            {/* </Route> */}
                        </Routes>
                    </div>
                </Col>
            </Row>
        </BrowserRouter>
    )
}
