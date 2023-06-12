export interface IFlightResponse {
    page: number;
    onPage: number;
    total: number;
    flights: IFlight[];
}

export interface IFlight {
    flightId: number;
    flightNo: string;
    scheduledDeparture: string;
    scheduledArrival: string;
    departureAirport: string;
    arrivalAirport: string;
    status: string;
    aircraftCode: string;
    actualDeparture: string;
    actualArrival: string;
    aircraftCodeNavigation: IAircraftCodeNavigation;
    arrivalAirportNavigation: IArrivalAirportNavigation;
    departureAirportNavigation: IArrivalAirportNavigation;
}

export interface IArrivalAirportNavigation {
    airportCode: string;
    airportName: string;
    city: string;
    timezone: string;
    flightArrivalAirportNavigations: string[];
    flightDepartureAirportNavigations: string[];
}


export interface IAircraftCodeNavigation {
    aircraftCode: string;
    model: string;
    range: number;
    flights: string[];
}
