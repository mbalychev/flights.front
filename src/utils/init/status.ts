
//перевод статусов
export const StatusRus = (angName: string): string => {
    switch (angName) {
        case 'Departed':
            return 'Отбыл';
        case 'Arrived':
            return 'Прибыл';
        case 'On Time':
            return 'Вовремя';
        case 'Cancelled':
            return 'Отменен';
        case 'Delayed':
            return 'Отложенный';
        case 'Scheduled':
            return 'Планируется';
        default:
            return 'не опрелен'
    }
}