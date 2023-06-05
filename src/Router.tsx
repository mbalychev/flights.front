import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import { LayoutPage } from './pages/LayoutPage';
import { Flights } from './pages/flights/flights';

export const links = {
    flights: (id: number) => `/flights/${id}`
}

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/" element={<LayoutPage />} />
                <Route path="flights/*" element={<Flights />}>
                    <Route path="find" element={<Flights />} />
                    <Route path=":id" element={<Flights />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
