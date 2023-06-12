import { API_SERV } from '../settings'

export const requestGet = async<T>(url: string): Promise<T> => {
    const req = await fetch(`${API_SERV}${url}`);

    return req.json();
}

export const requestPost = async<T>(url: string, body: any): Promise<T> => {
    const req = await fetch(`${API_SERV}${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return req.json();
}