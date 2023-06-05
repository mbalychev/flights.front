import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import { LayoutPage } from './pages/LayoutPage';
import { Flights } from './pages/flights/flights';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

export const links = {
    flights: (id: number) => `/flights/${id}`
}

export const Router = () => {
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="flights/*" element={<Flights />}>
                        <Route path="find" element={<Flights />} />
                        <Route path=":id" element={<Flights />} />
                    </Route>
                    {/* <Route path="/" element={<LayoutPage />}> */}
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
            <Layout className="layout">
                <Header style={{ display: 'flex', alignItems: 'center' }}>

                </Header>
                <Content style={{ padding: '0 50px' }}>

                </Content>
            </Layout>
        </div>
    )
}
