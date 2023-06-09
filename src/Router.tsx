import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Flights } from './pages/flights/flights';
import { LayoutMenu } from './pages/LayoutMenu';
import { Bookings } from './pages/bookings/bookings';
// import { Route } from 'react-router-dom';

export const links = {
    flight: (id: number) => `/flights/${id}`,
    // flights: () => navigate('/fligts')
}

export const Router = () => {

    return (
        <BrowserRouter>
            <LayoutMenu />
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
        </BrowserRouter>
    )
}
