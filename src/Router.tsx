import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Flights } from './pages/flights/flights';

export const links = {
    flights: (id: number) => `/flights/${id}`
}

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/" element={<Layout />} />
                <Route path="flights/*" element={<Flights />}>
                    <Route path="find" element={<Flights />} />
                    <Route path=":id" element={<Flights />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
