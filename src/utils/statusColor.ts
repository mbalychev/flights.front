
export const statusColor = (status: string): string => {

    switch (status) {
        case 'Departed':
            return 'geekblue';
        case 'Arrived':
            return 'green';
        case 'On Time':
            return 'blue';
        case 'Cancelled':
            return 'volcano';
        case 'Delayed':
            return 'magenta';
        case 'Scheduled':
            return 'blue';


        default:
            return 'defaut'
    }
}