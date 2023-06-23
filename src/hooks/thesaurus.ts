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
        queryKey: ['todos'],
        queryFn: thesaurusAPI.getTAirports,
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
        }
    }
}
