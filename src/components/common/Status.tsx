import { Select } from "antd";
interface IProps {
    width: string;
}
//перевод статусов
export const Status = (props: IProps): JSX.Element => {

    return (
        <Select
            style={{ width: props.width }}
            defaultValue={null}
            options={[
                { value: null, label: 'Все' },
                { value: 'Departed', label: 'Отбыл' },
                { value: 'Arrived', label: 'Прибыл' },
                { value: 'On Time', label: 'Вовремя' },
                { value: 'Cancelled', label: 'Отменен' },
                { value: 'Delayed', label: 'Отложенный' },
                { value: 'Scheduled', label: 'Планируется' }
            ]} />
    )
}