import { useQuery } from "@tanstack/react-query";
import { thesaurusAPI } from "../api";
// import { getTAirports } from "../api/thesaurus/thesaurus";


const staleTime = 3600000;

export const useThesaurus = () => {
    // аэропорты
    const {
        data: airportsState,
        isSuccess: isAirportsStatesSuccess,
        isError: airportsIsError,
        error: airportsError,
        isLoading: airportsIsLoading
    } = useQuery({
        queryKey: ['airports'],
        queryFn: thesaurusAPI.getTAirports,
        staleTime
    });

    //возд суда
    const {
        data: aircraftsState,
        isSuccess: isAircraftsStatesSuccess,
        isError: aircraftsIsError,
        error: aircraftsError,
        isLoading: aircraftsIsLoading
    } = useQuery({
        queryKey: ['aircrafts'],
        queryFn: thesaurusAPI.getTAircrafts,
        staleTime
    });

    // const thesauruReady = (
    //     isAirportsStatesSuccess
    // )

    return {
        airports: {
            ready: isAirportsStatesSuccess,
            airportsState,
            isSuccess: isAirportsStatesSuccess,
            isError: airportsIsError,
            error: airportsError,
            isLoading: airportsIsLoading
        },
        aircrafts: {
            ready: isAircraftsStatesSuccess,
            aircraftsState,
            isSuccess: isAircraftsStatesSuccess,
            isError: aircraftsIsError,
            error: aircraftsError,
            isLoading: aircraftsIsLoading
        }
    }
}
