import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Flights } from './pages/flights/flights';
import { LayoutMenu } from './pages/LayoutMenu';
import { Bookings } from './pages/bookings/bookings';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export const links = {
    flight: (id: number) => `/flights/${id}`,
}


const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: 'auto',
    color: '#fff',
    height: '3vh',
    backgroundColor: '#3a427830',
};
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '3vh',
    fontSize: 'small',
    backgroundColor: '#3a427830',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    height: '94vh',
    color: '#01081d',
    padding: '30px', overflow: 'hidden',
    backgroundColor: '#dbddea30',
};
const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#a1aac3',
    backgroundColor: '#989fc830',
};

export const Router = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Header style={headerStyle}>Header</Header>
                <Layout hasSider>
                    <Sider style={siderStyle}>
                        <LayoutMenu />
                    </Sider>
                    <Content style={contentStyle}>
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
                        </Routes>
                    </Content>
                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </BrowserRouter>
    )
}
