import { SortType } from "../models/flightSort"

//статусы полетов
export const statuses: { value: string | undefined, label: string }[] = [
    { value: undefined, label: 'Все' },
    { value: 'Departed', label: 'Отбыл' },
    { value: 'Arrived', label: 'Прибыл' },
    { value: 'On Time', label: 'Вовремя' },
    { value: 'Cancelled', label: 'Отменен' },
    { value: 'Delayed', label: 'Отложенный' },
    { value: 'Scheduled', label: 'Планируется' }
]

//сортировка по умолчанию для таблицы с фильтрами
export const sortFlights = [
    { value: SortType.status, label: 'статус' },
    { value: SortType.arrivalTime, label: 'время прилета' },
    { value: SortType.departureTime, label: 'время вылета' }
]