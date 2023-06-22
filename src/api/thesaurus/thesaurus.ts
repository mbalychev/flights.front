import { ITAirport } from '../../models/Thesaurus/TAiport';
import { IApiError } from '../../models/error';
import { requestGet } from '../request';
const API = 'api/Thesaurus';

export const getTAirports = async (): Promise<ITAirport[]> => {

    const resp = await requestGet<ITAirport[] | IApiError>(`/api/Thesaurus/Airports`);

    if ('error' in resp) { return []; }

    return resp as ITAirport[];
}