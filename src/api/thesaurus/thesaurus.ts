import { ITAirport } from '../../models/Thesaurus/TAiport';
import { ITAircrafts } from '../../models/Thesaurus/TAircrafts';
import { IApiError } from '../../models/error';
import { requestGet } from '../request';
const API = 'api/Thesaurus';

export const getTAirports = async (): Promise<ITAirport[]> => {

    const resp = await requestGet<ITAirport[] | IApiError>(`/api/Thesaurus/airports`);

    if ('error' in resp) { return []; }

    return resp as ITAirport[];
}

export const getTAircrafts = async (): Promise<ITAircrafts[]> => {

    const resp = await requestGet<ITAircrafts[] | IApiError>(`/api/Thesaurus/aircrafts`);

    if ('error' in resp) { return []; }

    return resp as ITAircrafts[];
}